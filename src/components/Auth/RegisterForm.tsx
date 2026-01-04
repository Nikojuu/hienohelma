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

import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Subtitle from "@/components/subtitle";
import { registerCustomer } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  firstName: z.string().min(1, "Etunimi on pakollinen"),
  lastName: z.string().min(1, "Sukunimi on pakollinen"),
  email: z.string().email("Virheellinen sahkopostiosoite"),
  password: z.string().min(8, "Salasanan on oltava vahintaan 8 merkkia pitka"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    try {
      const result = await registerCustomer(formData);
      if (result.error) {
        toast({
          title: "Rekisterointi epaonnistui",
          description:
            typeof result.error === "string"
              ? result.error
              : "Tarkista tietosi ja yrita uudelleen",
          variant: "destructive",
        });
      } else if (result.success) {
        toast({
          title: "Rekisterointi onnistui",
          description:
            "Tili luotu! Tarkista sahkopostisi vahvistaaksesi tilisi.",
        });
        form.reset();
        router.push("/mypage");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full pt-8 md:pt-16 pb-16 md:pb-24 bg-soft-ivory min-h-screen">
      <div className="container mx-auto px-4">
        <Subtitle subtitle="Luo tilisi" />

        <div className="max-w-lg mx-auto mt-12">
          {/* Form card */}
          <div className="relative bg-soft-ivory p-8 md:p-10">
            {/* Border frame */}
            <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full border border-blush/60" />
              <h2 className="font-primary text-2xl md:text-3xl text-midnight">
                Liity mukaan
              </h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-secondary text-midnight">
                          Etunimi *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                            placeholder="Anna"
                          />
                        </FormControl>
                        <FormMessage className="text-sm font-secondary text-wine" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-secondary text-midnight">
                          Sukunimi *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                            placeholder="Korhonen"
                          />
                        </FormControl>
                        <FormMessage className="text-sm font-secondary text-wine" />
                      </FormItem>
                    )}
                  />
                </div>

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
                            placeholder="Vahintaan 8 merkkia"
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

                {/* Decorative line before button */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Luodaan tilia..." : "Rekisteroidy"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
