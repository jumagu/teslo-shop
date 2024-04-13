import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { Title } from "@/components";

export const metadata = {
  title: "My Profile",
  description:
    "Explore and manage your user profile on Teslo Shop. View your order history, update personal information, and more.",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  const { name, email, role } = session.user;

  return (
    <div className="w-full xm:max-w-[600px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
      <Title
        title="Profile"
        className="pt-6 xm:pt-16 text-[28px] leading-[34px] tracking-[1.4px]"
      />

      <div className="mt-6">
        <div className="grid grid-cols-1">
          <div>
            <p className="font-medium text-gray-600 text-[13px] leading-[26px] tracking-[1.8px]">
              Name
            </p>
            <p className="font-semibold text-[13px] leading-[26px] tracking-[1.8px]">
              {name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-medium text-[18px] leading-24px] tracking-[1.4px]">
          Security
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-2">
          <div>
            <p className="font-medium text-gray-600 text-[13px] leading-[26px] tracking-[1.8px]">
              Email
            </p>
            <p className="font-semibold text-[13px] leading-[26px] tracking-[1.8px]">
              {email}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-600 text-[13px] leading-[26px] tracking-[1.8px]">
              Role
            </p>
            <p className="font-semibold text-[13px] leading-[26px] tracking-[1.8px]">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
