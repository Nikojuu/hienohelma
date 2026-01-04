"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/app/actions";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Subtitle from "@/components/subtitle";

const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const result = await submitContactForm(formData);
    if (result.error) {
      toast({
        title: "Lomakkeen lahetys epaonnistui",
        description: "Tarkista antamasi tiedot ja yrita uudelleen",
        variant: "destructive",
      });
      setFormStatus("Form submission failed. Please try again.");
    } else if (result.success) {
      toast({
        title: "Lomake lahetetty onnistuneesti",
        description: "Kiitos yhteydenotostasi. Palaamme asiaan pian.",
      });
      setFormStatus(result.success);
      form.reset();
    }
  }

  return (
    <section className="pt-8 md:pt-16 pb-16 bg-soft-ivory">
      <Subtitle
        subtitle="Ollaan yhteydessa!"
        description="Kerro meille ideasi tai kysy mita vain - vastaamme mielellani"
      />

      <div className="container mx-auto px-4 max-w-xl">
        {/* Form card */}
        <div className="relative bg-soft-ivory p-6 md:p-10">
          {/* Card border */}
          <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name fields in a row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-midnight font-secondary text-sm">
                        Etunimi *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                        />
                      </FormControl>
                      <FormMessage className="text-wine text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-midnight font-secondary text-sm">
                        Sukunimi
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                        />
                      </FormControl>
                      <FormMessage className="text-wine text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-midnight font-secondary text-sm">
                      Sahkoposti *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone"
                      />
                    </FormControl>
                    <FormMessage className="text-wine text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-midnight font-secondary text-sm">
                      Viesti *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Laita meille viestia jos sinulla on idea jonka haluat toteuttaa tai vain rupatella jostain..."
                        {...field}
                        rows={5}
                        className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight placeholder:text-stone resize-none"
                      />
                    </FormControl>
                    <FormDescription className="text-stone text-xs font-secondary">
                      Viestissa tulee olla vahintaan 5 kirjainta
                    </FormDescription>
                    <FormMessage className="text-wine text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
                >
                  Laheta viesti
                </Button>
              </div>
            </form>
          </Form>

          {formStatus && (
            <div className="mt-6 p-4 bg-whisper-pink/30 border border-blush/20 text-center">
              <p className="text-sm font-secondary text-midnight/80">
                {formStatus}
              </p>
            </div>
          )}
        </div>

        {/* Alternative contact info */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-blush/40" />
            <span className="text-xs tracking-[0.2em] uppercase font-secondary text-stone">
              tai
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-blush/40" />
          </div>

          <p className="text-sm font-secondary text-stone mb-3">
            Voit myos lahettaa sahkopostia suoraan
          </p>
          <a
            href="mailto:info@example.com"
            className="inline-flex items-center gap-2 text-midnight hover:text-blush transition-colors duration-300 font-secondary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>info@example.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
