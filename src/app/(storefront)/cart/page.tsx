import CartPage from "@/components/Cart/CartPage";
import { Metadata } from "next";
import { getStoreConfig } from "@/lib/storeConfig";

export const metadata: Metadata = {
  title: "Hienohelma | Ostoskori",
  description:
    "Tutustu Hienohelman tyylikkääseen naisten muotivalikoimaan ja löydä itsellesi sopivat asusteet.",
  robots: "noindex, nofollow",
};

const CartRoute = async () => {
  const storeConfig = await getStoreConfig();
  const campaigns = storeConfig.campaigns;

  return <CartPage campaigns={campaigns} />;
};

export default CartRoute;
