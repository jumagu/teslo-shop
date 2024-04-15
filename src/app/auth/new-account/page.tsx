import { Title } from "@/components";
import { NewAccountForm } from "./ui/NewAccountForm";

export const metadata = {
  title: "Register",
  description:
    "Sign up to create a new account at Teslo Shop. Enjoy exclusive benefits, order tracking, and more.",
};

export default function NewAccountPage() {
  return (
    <div className="px-6 min-[600px]:px-9 mlg:px-12 pb-8 h-full">
      <div className="max-w-[362px] my-[18px] sm:mt-8 mx-auto">
        <Title
          title="Create Account"
          className="pt-8 pb-2 text-[24px] sm:text-[28px] leading-[30px] sm:leading-[34px] tracking-[1.2px] sm:tracking-[1.4px] transition-all duration-300"
        ></Title>

        <NewAccountForm />
      </div>
    </div>
  );
}
