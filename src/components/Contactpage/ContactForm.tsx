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
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/app/actions";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const FormSchema = z.object({
  firstName: z.string().min(1, "Etunimi vaaditaan"),
  lastName: z.string().optional(),
  email: z.string().email("Virheellinen sähköpostiosoite"),
  message: z.string().min(5, "Viestin tulee olla vähintään 5 merkkiä"),
});

// Contact information
const CONTACT_INFO = {
  address: "Kauppakatu 14",
  city: "40100 Jyväskylä",
  phone: "040 524 9478",
  email: "info@hienohelma.fi",
  hours: [
    { days: "Ti - Pe", time: "11:00 - 18:00" },
    { days: "La", time: "11:00 - 15:00" },
    { days: "Su - Ma", time: "Suljettu" },
  ],
  businessId: "2529033-1",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ContactInfoCard = ({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="group"
  >
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-whisper-pink/50 rounded-full transition-all duration-300 group-hover:bg-blush/20">
        <Icon className="w-4 h-4 text-blush" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-secondary text-xs tracking-[0.15em] uppercase text-stone mb-1.5">
          {title}
        </h3>
        <div className="font-secondary text-midnight/80 text-[15px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </motion.div>
);

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
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const result = await submitContactForm(formData);
    if (result.error) {
      toast({
        title: "Lomakkeen lähetys epäonnistui",
        description: "Tarkista antamasi tiedot ja yritä uudelleen",
        variant: "destructive",
      });
      setFormStatus("error");
    } else if (result.success) {
      toast({
        title: "Viesti lähetetty",
        description: "Kiitos yhteydenotostasi. Palaamme asiaan pian.",
      });
      setFormStatus("success");
      form.reset();
    }
  }

  return (
    <section className="min-h-screen bg-soft-ivory">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-whisper-pink/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blush/10 to-transparent rounded-full blur-2xl" />

        <div className="container mx-auto px-4 max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blush/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-blush/60" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-blush/50" />
            </div>

            <h1 className="font-primary text-4xl md:text-5xl lg:text-6xl text-midnight mb-6 tracking-tight">
              Ota yhteyttä
            </h1>
            <p className="font-secondary text-midnight/60 text-lg md:text-xl leading-relaxed">
              Autamme mielellämme kaikissa kysymyksissä koskien tuotteitamme,
              kokoja tai tilauksiasi.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Information - Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-10"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants}>
              <span className="font-secondary text-xs tracking-[0.2em] uppercase text-blush">
                Yhteystiedot
              </span>
              <h2 className="font-primary text-2xl md:text-3xl text-midnight mt-2">
                Käy myymälässämme
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-blush/60 to-transparent mt-4" />
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-8">
              <ContactInfoCard icon={MapPin} title="Osoite" delay={0.3}>
                <p>{CONTACT_INFO.address}</p>
                <p>{CONTACT_INFO.city}</p>
              </ContactInfoCard>

              <ContactInfoCard icon={Phone} title="Puhelin" delay={0.4}>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="hover:text-blush transition-colors duration-300"
                >
                  {CONTACT_INFO.phone}
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={Mail} title="Sähköposti" delay={0.5}>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-blush transition-colors duration-300"
                >
                  {CONTACT_INFO.email}
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={Clock} title="Aukioloajat" delay={0.6}>
                <div className="space-y-1">
                  {CONTACT_INFO.hours.map((slot, index) => (
                    <div key={index} className="flex justify-between gap-8">
                      <span className="text-stone">{slot.days}</span>
                      <span className={slot.time === "Suljettu" ? "text-stone/60" : ""}>
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ContactInfoCard>
            </div>

            {/* Business ID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t border-stone/10"
            >
              <p className="font-secondary text-xs text-stone/60">
                Y-tunnus: {CONTACT_INFO.businessId}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div className="relative bg-white p-8 md:p-10 lg:p-12 shadow-xl shadow-midnight/5">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blush/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blush/30" />

              {/* Form Header */}
              <div className="mb-8">
                <span className="font-secondary text-xs tracking-[0.2em] uppercase text-blush">
                  Yhteydenotto
                </span>
                <h2 className="font-primary text-2xl md:text-3xl text-midnight mt-2">
                  Lähetä viesti
                </h2>
                <p className="font-secondary text-midnight/60 text-sm mt-3">
                  Täytä alla oleva lomake ja palaamme asiaan mahdollisimman pian.
                </p>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-whisper-pink/50 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blush"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-primary text-2xl text-midnight mb-3">
                    Kiitos viestistäsi!
                  </h3>
                  <p className="font-secondary text-midnight/60 mb-6">
                    Palaamme asiaan mahdollisimman pian.
                  </p>
                  <Button
                    onClick={() => setFormStatus(null)}
                    variant="outline"
                    className="border-blush/30 text-midnight hover:bg-whisper-pink/30 hover:border-blush/50"
                  >
                    Lähetä uusi viesti
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-midnight/80 font-secondary text-sm font-normal">
                              Etunimi <span className="text-blush">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-12 bg-soft-ivory/50 border-stone/15 rounded-none focus:border-blush/50 focus:ring-0 font-secondary text-midnight placeholder:text-stone/40 transition-colors duration-300"
                              />
                            </FormControl>
                            <FormMessage className="text-wine text-xs font-secondary" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-midnight/80 font-secondary text-sm font-normal">
                              Sukunimi
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-12 bg-soft-ivory/50 border-stone/15 rounded-none focus:border-blush/50 focus:ring-0 font-secondary text-midnight placeholder:text-stone/40 transition-colors duration-300"
                              />
                            </FormControl>
                            <FormMessage className="text-wine text-xs font-secondary" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-midnight/80 font-secondary text-sm font-normal">
                            Sähköposti <span className="text-blush">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="h-12 bg-soft-ivory/50 border-stone/15 rounded-none focus:border-blush/50 focus:ring-0 font-secondary text-midnight placeholder:text-stone/40 transition-colors duration-300"
                            />
                          </FormControl>
                          <FormMessage className="text-wine text-xs font-secondary" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-midnight/80 font-secondary text-sm font-normal">
                            Viesti <span className="text-blush">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Kirjoita viestisi tähän..."
                              {...field}
                              rows={5}
                              className="bg-soft-ivory/50 border-stone/15 rounded-none focus:border-blush/50 focus:ring-0 font-secondary text-midnight placeholder:text-stone/40 resize-none transition-colors duration-300"
                            />
                          </FormControl>
                          <FormMessage className="text-wine text-xs font-secondary" />
                        </FormItem>
                      )}
                    />

                    {/* Submit button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full sm:w-auto px-12 py-6 h-auto bg-midnight text-soft-ivory font-secondary text-sm tracking-[0.1em] uppercase rounded-none transition-all duration-500 hover:bg-blush hover:text-midnight disabled:opacity-50"
                      >
                        {form.formState.isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Lähetetään...
                          </span>
                        ) : (
                          "Lähetä viesti"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
