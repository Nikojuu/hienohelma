import { ShoppingCart, User, LogOut, Home, Heart } from "lucide-react";
import Link from "next/link";

const MyPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="pt-8 md:pt-16 pb-16 md:pb-24 bg-soft-ivory min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-72 lg:w-80">
            <div className="relative bg-soft-ivory p-6 md:sticky md:top-8">
              {/* Border frame */}
              <div className="absolute inset-0 border border-stone/15 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full border border-blush/60" />
                <h2 className="font-primary text-xl text-midnight">Oma tili</h2>
              </div>

              {/* Divider */}
              <div className="mb-6 h-[1px] bg-gradient-to-r from-blush/30 to-transparent" />

              <nav className="space-y-1">
                <Link
                  href="/mypage"
                  className="group flex items-center gap-3 px-4 py-3 font-secondary text-sm text-midnight/70 hover:text-midnight transition-all duration-300 hover:bg-pearl border-l-2 border-transparent hover:border-blush/60"
                >
                  <Home className="w-4 h-4 transition-colors group-hover:text-blush" />
                  <span>Yleiskatsaus</span>
                </Link>
                <Link
                  href="/myorders"
                  className="group flex items-center gap-3 px-4 py-3 font-secondary text-sm text-midnight/70 hover:text-midnight transition-all duration-300 hover:bg-pearl border-l-2 border-transparent hover:border-blush/60"
                >
                  <ShoppingCart className="w-4 h-4 transition-colors group-hover:text-blush" />
                  <span>Tilaukset</span>
                </Link>
                <Link
                  href="/myinfo"
                  className="group flex items-center gap-3 px-4 py-3 font-secondary text-sm text-midnight/70 hover:text-midnight transition-all duration-300 hover:bg-pearl border-l-2 border-transparent hover:border-blush/60"
                >
                  <User className="w-4 h-4 transition-colors group-hover:text-blush" />
                  <span>Omat tiedot</span>
                </Link>
                <Link
                  href="/mywishlist"
                  className="group flex items-center gap-3 px-4 py-3 font-secondary text-sm text-midnight/70 hover:text-midnight transition-all duration-300 hover:bg-pearl border-l-2 border-transparent hover:border-blush/60"
                >
                  <Heart className="w-4 h-4 transition-colors group-hover:text-blush" />
                  <span>Toivelista</span>
                </Link>
              </nav>

              {/* Divider */}
              <div className="my-6 h-[1px] bg-gradient-to-r from-blush/30 to-transparent" />

              <Link
                href="/login"
                className="group flex items-center gap-3 px-4 py-3 font-secondary text-sm text-stone hover:text-wine transition-all duration-300 hover:bg-wine/5 border-l-2 border-transparent hover:border-wine/60"
              >
                <LogOut className="w-4 h-4 transition-colors group-hover:text-wine" />
                <span>Kirjaudu ulos</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </section>
  );
};

export default MyPageLayout;
