"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Eye, EyeOff, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Subtitle from "@/components/subtitle";
import {
  loginCustomer,
  resendVerificationEmail,
} from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginSchema = z.object({
  email: z.string().email("Virheellinen sahkopostiosoite"),
  password: z.string().min(1, "Salasana on pakollinen"),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);
    setRequiresVerification(false);
    setCustomerId(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    try {
      const result = await loginCustomer(formData);

      if (result.requiresVerification && result.customerId) {
        setRequiresVerification(true);
        setCustomerId(result.customerId);
        setFormError(
          result.error || "Vahvista sahkopostiosoitteesi ennen kirjautumista."
        );
      } else if (result.error) {
        setFormError(
          "Kirjautuminen epaonnistui. Tarkista sahkopostisi ja salasanasi."
        );
        toast({
          title: "Kirjautuminen epaonnistui",
          description:
            "Kirjautuminen epaonnistui. Tarkista sahkopostisi ja salasanasi.",
          variant: "destructive",
        });
      } else if (result.success) {
        setFormSuccess("Kirjautuminen onnistui! Tervetuloa takaisin!");
        toast({
          title: "Kirjautuminen onnistui",
          description: "Tervetuloa takaisin!",
        });
        form.reset();
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    if (!customerId) return;

    setIsResendingVerification(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const result = await resendVerificationEmail(customerId);

      if (result.success) {
        setFormSuccess("Vahvistussahkoposti lahetetty! Tarkista sahkopostisi.");
        toast({
          title: "Sahkoposti lahetetty",
          description:
            "Vahvistussahkoposti on lahetetty. Tarkista sahkopostisi.",
        });
      } else {
        setFormError(result.error || "Sahkopostin lahettaminen epaonnistui.");
        toast({
          title: "Virhe",
          description: "Sahkopostin lahettaminen epaonnistui. Yrita uudelleen.",
          variant: "destructive",
        });
      }
    } finally {
      setIsResendingVerification(false);
    }
  }

  return (
    <div className="w-full pt-8 md:pt-16 pb-16 md:pb-24 bg-soft-ivory min-h-screen">
      <div className="container mx-auto px-4">
        <Subtitle subtitle="Kirjaudu sisaan" />

        <div className="max-w-lg mx-auto mt-12">
          {/* Form card */}
          <div className="relative bg-soft-ivory p-8 md:p-10">
            {/* Border frame */}
            <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full border border-blush/60" />
              <h2 className="font-primary text-2xl md:text-3xl text-midnight">
                Tervetuloa takaisin
              </h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Form Status Messages */}
                {formError && (
                  <div className="flex items-center space-x-3 p-4 bg-wine/10 border border-wine/30">
                    <XCircle className="h-5 w-5 text-wine flex-shrink-0" />
                    <p className="text-sm font-secondary text-midnight/80">
                      {formError}
                    </p>
                  </div>
                )}

                {formSuccess && (
                  <div className="flex items-center space-x-3 p-4 bg-blush/10 border border-blush/30">
                    <CheckCircle className="h-5 w-5 text-blush flex-shrink-0" />
                    <p className="text-sm font-secondary text-midnight/80">
                      {formSuccess}
                    </p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-secondary text-midnight">
                        Sahkoposti *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                          placeholder="anna@esimerkki.fi"
                        />
                      </FormControl>
                      <FormMessage className="text-sm font-secondary text-wine" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-secondary text-midnight">
                        Salasana *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                            placeholder="Salasanasi"
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-stone hover:text-blush transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Piilota salasana" : "Nayta salasana"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm font-secondary text-wine" />
                    </FormItem>
                  )}
                />

                {/* Forgot password link */}
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-secondary text-stone hover:text-blush transition-colors"
                  >
                    Unohditko salasanasi?
                  </Link>
                </div>

                {/* Decorative line before buttons */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Kirjaudutaan..." : "Kirjaudu sisaan"}
                  </button>

                  {requiresVerification && customerId && (
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={isResendingVerification}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-midnight/30 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:text-blush disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResendingVerification ? (
                        "Lahetetaan..."
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          Laheta uudelleen
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
