import { redirect } from "next/navigation";
import Link from "next/link";

interface VerificationResult {
  success?: boolean;
  message?: string;
  error?: string;
}

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

async function verifyEmail(token: string): Promise<VerificationResult> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STOREFRONT_API_URL}/api/storefront/v1/customer/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.STOREFRONT_API_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );

    const data: VerificationResult = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message || "Sähköposti vahvistettu onnistuneesti!",
      };
    } else {
      return {
        success: false,
        error: data.error || "Sähköpostin vahvistus epäonnistui.",
      };
    }
  } catch (error) {
    console.error("Email verification error:", error);
    return {
      success: false,
      error: "Tapahtui odottamaton virhe. Yritä uudelleen.",
    };
  }
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { token } = await searchParams;

  // Redirect to home if no token provided
  if (!token) {
    redirect("/");
  }

  // Perform verification
  const result = await verifyEmail(token);
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header with circle decoration */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-2 h-2 rounded-full border border-blush/60" />
            <div className="w-16 h-[1px] bg-gradient-to-r from-blush/60 to-champagne-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold/50" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-blush/60 to-champagne-gold/40" />
            <div className="w-2 h-2 rounded-full border border-blush/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-primary text-midnight tracking-tight">
            Sähköpostin vahvistus
          </h2>
          <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent max-w-xs mx-auto" />
        </div>

        {/* Main card */}
        <div className="relative bg-soft-ivory p-8 md:p-10">
          {/* Border frame */}
          <div className="absolute inset-0 border border-blush/15 pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-blush/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-blush/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-blush/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-blush/40" />

          {result.success ? (
            <div className="text-center relative">
              <div className="mx-auto flex items-center justify-center h-16 w-16 mb-6">
                <svg
                  className="h-16 w-16 text-blush"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-primary text-midnight mb-4">
                Vahvistus onnistui!
              </h3>
              <p className="font-secondary text-midnight/70 mb-6">{result.message}</p>

              <div className="mb-6 h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

              <div className="space-y-4">
                <p className="text-sm font-secondary text-midnight/60">
                  Voit nyt kirjautua sisään tilillesi.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
                >
                  Siirry kirjautumaan
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center relative">
              <div className="mx-auto flex items-center justify-center h-16 w-16 mb-6">
                <svg
                  className="h-16 w-16 text-wine"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-primary text-midnight mb-4">
                Vahvistus epäonnistui
              </h3>
              <p className="font-secondary text-midnight/70 mb-6">{result.error}</p>

              <div className="mb-6 h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent" />

              <div className="space-y-4">
                <p className="text-sm font-secondary font-medium text-midnight/70">Mahdolliset syyt:</p>
                <ul className="text-sm font-secondary text-midnight/60 text-left space-y-2 max-w-sm mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="text-wine mt-1">•</span>
                    <span>Linkki on vanhentunut (24 tunnin kuluttua)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wine mt-1">•</span>
                    <span>Linkki on jo käytetty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wine mt-1">•</span>
                    <span>Virheellinen tai vaurioitunut linkki</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-midnight text-soft-ivory font-secondary text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blush hover:text-midnight"
                  >
                    Takaisin kirjautumaan
                  </Link>
                  <p className="text-xs font-secondary text-midnight/50 mt-3">
                    Voit pyytää uuden vahvistuslinkin kirjautumissivulla
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-secondary text-sm text-midnight/70 hover:text-blush transition-colors duration-300"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Takaisin etusivulle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
