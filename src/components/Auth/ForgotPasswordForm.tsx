"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Subtitle from "@/components/subtitle";
import { forgotPassword } from "@/lib/actions/authActions";
import Link from "next/link";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Virheellinen sahkopostiosoite"),
});

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);

    const formData = new FormData();
    formData.append("email", data.email);

    try {
      const result = await forgotPassword(formData);

      if (result.error) {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : "Virhe lahettaessa sahkopostia.";
        setFormError(errorMessage);
        toast({
          title: "Virhe",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (result.success) {
        setFormSuccess(result.message);
        toast({
          title: "Sahkoposti lahetetty",
          description: result.message,
        });
        form.reset();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full pt-8 md:pt-16 pb-16 md:pb-24 bg-soft-ivory min-h-screen">
      <div className="container mx-auto px-4">
        <Subtitle subtitle="Unohditko salasanasi?" />

        <div className="max-w-lg mx-auto mt-12">
          {/* Form card */}
          <div className="relative bg-soft-ivory p-8 md:p-10">
            {/* Border frame */}
            <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full border border-blush/60" />
              <h2 className="font-primary text-2xl md:text-3xl text-midnight">
                Palauta salasana
              </h2>
            </div>

            <p className="font-secondary text-sm text-midnight/70 mb-8">
              Syota sahkopostiosoitteesi, niin lahetamme sinulle ohjeet salasanan
              vaihtamiseen.
            </p>

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

                {/* Decorative line before buttons */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Lahetetaan..." : "Laheta palautuslinkki"}
                  </button>
                </div>

                {/* Back to login link */}
                <div className="text-center pt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-secondary text-midnight/70 hover:text-blush transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Takaisin kirjautumiseen
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
