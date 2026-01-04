import { Customer } from "@putiikkipalvelu/storefront-sdk";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import { getUser } from "@/lib/actions/authActions";
import { redirect } from "next/navigation";
import Link from "next/link";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { user }: { user: Customer | null } = await getUser();
  const resolvedSearchParams = await searchParams;

  if (user) {
    // If user is already logged in, redirect to mypage
    redirect("/mypage");
  }

  // Check if token is provided
  if (!resolvedSearchParams.token) {
    return (
      <div className="w-full pt-8 md:pt-16 pb-16 md:pb-24 bg-soft-ivory min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto mt-12">
            <div className="relative bg-soft-ivory p-8 md:p-10 text-center">
              <div className="absolute inset-0 border border-blush/15 pointer-events-none" />
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-blush/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-blush/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-blush/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-blush/40" />

              <h2 className="font-primary text-2xl md:text-3xl text-midnight mb-4">
                Virheellinen linkki
              </h2>
              <p className="font-secondary text-midnight/70 mb-6">
                Salasanan palautuslinkki on virheellinen tai se puuttuu. Pyydä
                uusi palautuslinkki.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
              >
                Pyydä uusi linkki
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={resolvedSearchParams.token} />;
};

export default ResetPasswordPage;
