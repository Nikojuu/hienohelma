"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  editCustomerProfile,
  deleteCustomerAccount,
} from "@/lib/actions/authActions";
import {
  User,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type FormState = {
  error?: string;
  success?: string;
  fieldErrors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
  };
};

const EditCustomerForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formState, setFormState] = useState<FormState>({});
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await editCustomerProfile(formData);

      if (result.error) {
        console.error("Profile update API error:", result.error);

        if (typeof result.error === "string") {
          toast({
            title: "Profiilin paivittaminen epaonnistui",
            description: result.error,
            variant: "destructive",
          });
          setFormState({
            error: result.error,
          });
        } else {
          toast({
            title: "Profiilin paivittaminen epaonnistui",
            description: "Tarkista antamasi tiedot ja yrita uudelleen",
            variant: "destructive",
          });
          setFormState({ fieldErrors: result.error });
        }
      } else {
        toast({
          title: "Profiili paivitetty onnistuneesti",
          description: "Tietosi on paivitetty onnistuneesti.",
        });
        setFormState({
          success: "Profiili paivitetty onnistuneesti!",
        });
        router.refresh();
      }
    });
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCustomerAccount();

      if (result.error) {
        console.error("Account deletion API error:", result.error);
        toast({
          title: "Tilin poistaminen epaonnistui",
          description: "Yrita uudelleen.",
          variant: "destructive",
        });
        setFormState({
          error: "Tilin poistaminen epaonnistui. Yrita uudelleen.",
        });
      } else {
        toast({
          title: "Tili poistettu",
          description: "Tili on poistettu onnistuneesti.",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error during account deletion:", error);
      toast({
        title: "Odottamaton virhe tapahtui",
        description: "Yrita uudelleen.",
        variant: "destructive",
      });
      setFormState({
        error: "Odottamaton virhe tapahtui. Yrita uudelleen.",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full border border-blush/60" />
          <h2 className="text-2xl md:text-3xl font-primary text-midnight">Omat tiedot</h2>
        </div>
        <p className="font-secondary text-midnight/60 ml-5">
          Hallitse tilitietojasi ja asetuksiasi
        </p>
      </div>

      {/* Profile Edit Form */}
      <div className="relative bg-soft-ivory p-6 md:p-8">
        {/* Border frame */}
        <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-blush" />
            <h3 className="font-primary text-xl text-midnight">Profiilitiedot</h3>
          </div>
          <p className="font-secondary text-sm text-midnight/60 mb-6">
            Muokkaa henkilotietojasi ja yhteystietojasi
          </p>

          <div className="mb-6 h-[1px] bg-gradient-to-r from-blush/30 to-transparent" />

          {formState.error && (
            <div className="mb-6 flex items-center space-x-3 p-4 bg-wine/10 border border-wine/30">
              <AlertTriangle className="h-5 w-5 text-wine flex-shrink-0" />
              <p className="text-sm font-secondary text-midnight/80">{formState.error}</p>
            </div>
          )}
          {formState.success && (
            <div className="mb-6 flex items-center space-x-3 p-4 bg-blush/10 border border-blush/30">
              <CheckCircle className="h-5 w-5 text-blush flex-shrink-0" />
              <p className="text-sm font-secondary text-midnight/80">{formState.success}</p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-secondary text-midnight">
                  Etunimi
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  defaultValue={user.firstName}
                  disabled={isPending}
                  className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight"
                />
                {formState.fieldErrors?.firstName && (
                  <p className="text-sm font-secondary text-wine">
                    {formState.fieldErrors.firstName[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-secondary text-midnight">
                  Sukunimi
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  defaultValue={user.lastName}
                  disabled={isPending}
                  className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight"
                />
                {formState.fieldErrors?.lastName && (
                  <p className="text-sm font-secondary text-wine">
                    {formState.fieldErrors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-secondary text-midnight">
                Sahkopostiosoite
              </label>
              <Input
                id="email"
                name="email"
                type="text"
                defaultValue={user.email}
                disabled={isPending}
                className="bg-pearl border-stone/20 focus:border-blush/50 focus:ring-blush/20 font-secondary text-midnight"
              />
              {formState.fieldErrors?.email && (
                <p className="text-sm font-secondary text-wine">
                  {formState.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-3 px-8 py-3 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px] justify-center"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Tallennetaan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Tallenna
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Account Deletion Section */}
      <div className="relative bg-soft-ivory p-6 md:p-8">
        {/* Border frame with danger color */}
        <div className="absolute inset-0 border border-wine/20 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-wine" />
            <h3 className="font-primary text-xl text-wine">Vaarallinen alue</h3>
          </div>
          <p className="font-secondary text-sm text-midnight/60 mb-6">
            Poista tilisi pysyvasti. Tata toimintoa ei voi peruuttaa.
          </p>

          <div className="mb-6 h-[1px] bg-gradient-to-r from-wine/30 to-transparent" />

          <div className="space-y-4">
            <div className="p-4 bg-wine/5 border border-wine/20">
              <h4 className="font-primary text-base text-wine mb-3">
                Mita tapahtuu, kun poistat tilisi:
              </h4>
              <ul className="text-sm font-secondary text-midnight/70 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-wine mt-1">•</span>
                  <span>Kaikki henkilotietosi poistetaan pysyvasti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wine mt-1">•</span>
                  <span>Tilaushistoriasi sailyy nimettomana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wine mt-1">•</span>
                  <span>Et voi enaa kirjautua sisaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wine mt-1">•</span>
                  <span>Tata toimintoa ei voi peruuttaa</span>
                </li>
              </ul>
            </div>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-3 bg-wine text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-wine/80"
              >
                <Trash2 className="w-4 h-4" />
                Poista tili
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-wine/10 border border-wine/30">
                  <AlertTriangle className="h-5 w-5 text-wine flex-shrink-0" />
                  <p className="text-sm font-secondary text-midnight/80">
                    Oletko varma, etta haluat poistaa tilisi pysyvasti?
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-midnight/30 text-midnight font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:border-blush hover:text-blush disabled:opacity-50"
                  >
                    Peruuta
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-wine text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-wine/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Poistetaan...
                      </>
                    ) : (
                      "Kylla, poista tili"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerForm;
