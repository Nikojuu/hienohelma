import { Customer } from "@putiikkipalvelu/storefront-sdk";
import RegisterForm from "@/components/Auth/RegisterForm";
import { getUser } from "@/lib/actions/authActions";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const { user }: { user: Customer | null } = await getUser();

  if (user) {
    redirect("/mypage");
  }
  return <RegisterForm />;
};

export default RegisterPage;
