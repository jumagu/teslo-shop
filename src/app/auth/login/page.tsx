import { Title } from "@/components";
import { LoginForm } from "./ui/LoginForm";

export const metadata = {
  title: "Login",
  description:
    "Access your account at Teslo Shop. Log in to enjoy a personalized shopping experience and access exclusive features.",
};

export default function LoginPage() {
  return (
    <div className="px-6 min-[600px]:px-9 mlg:px-12 h-full">
      <div className="max-w-[362px] mt-8 mb-[18px] mx-auto">
        <Title
          title="Sign In"
          className="pt-8 pb-2 text-[24px] sm:text-[28px] leading-[30px] sm:leading-[34px] tracking-[1.2px] sm:tracking-[1.4px] transition-all duration-300"
        ></Title>

        <LoginForm />
      </div>
    </div>
  );
}
