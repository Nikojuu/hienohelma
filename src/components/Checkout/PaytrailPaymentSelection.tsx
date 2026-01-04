import type { PaytrailCheckoutResponse } from "@putiikkipalvelu/storefront-sdk";
import Image from "next/image";

const PaymentSelection = ({
  paytrailData,
}: {
  paytrailData: PaytrailCheckoutResponse;
}) => {
  const { groups, providers } = paytrailData;

  if (!groups || !providers) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header with circle decoration */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-2 h-2 rounded-full border border-blush/60" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-blush/60 to-champagne-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold/50" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-blush/60 to-champagne-gold/40" />
          <div className="w-2 h-2 rounded-full border border-blush/60" />
        </div>
        <h1 className="text-3xl md:text-4xl font-primary text-midnight tracking-tight">
          Valitse maksutapa
        </h1>
        <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-blush/30 to-transparent max-w-xs mx-auto" />
      </div>

      {groups.map((group) => (
        <div key={group.id} className="relative mb-10 bg-soft-ivory p-6 md:p-8">
          {/* Border frame */}
          <div className="absolute inset-0 border border-blush/15 pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-blush/40" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-blush/40" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-blush/40" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-blush/40" />

          {/* Group header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blush/60" />
            <Image
              src={group.icon}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h2 className="text-xl md:text-2xl font-primary text-midnight">
              {group.name}
            </h2>
          </div>

          {/* Divider line */}
          <div className="mb-6 h-[1px] bg-gradient-to-r from-blush/30 via-blush/20 to-transparent" />

          {/* Payment providers grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {providers
              .filter((provider) => provider.group === group.id)
              .map((provider) => (
                <form
                  key={`${provider.id}-${provider.name}`}
                  method="POST"
                  action={provider.url}
                  className="w-full"
                >
                  {provider.parameters.map((param) => (
                    <input
                      key={param.name}
                      type="hidden"
                      name={param.name}
                      value={param.value}
                    />
                  ))}
                  <button
                    type="submit"
                    className="group relative w-full p-4 bg-pearl/30 border border-blush/10 transition-all duration-300 hover:border-blush/40 hover:bg-pearl/50 hover:shadow-md flex items-center justify-center min-h-[80px]"
                  >
                    {/* Subtle corner accents on hover */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Image
                      src={provider.svg}
                      alt={provider.name}
                      width={100}
                      height={40}
                      className="max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                </form>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentSelection;
