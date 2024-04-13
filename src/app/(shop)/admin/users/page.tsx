export const revalidate = 0;

import { redirect } from "next/navigation";

import { Title } from "@/components";
import { getAllUsers } from "@/actions";

import { UsersTable } from "./ui/UsersTable";

export const metadata = {
  title: "Manage Users - Admin Panel",
  description:
    "Administer user accounts and permissions on Teslo Shop admin panel. Access and manage user information securely.",
};

export default async function AdminUsersPage() {
  const { ok, users = [] } = await getAllUsers();

  if (!ok) redirect("/auth/login");

  return (
    <div className="w-full xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
      <Title
        title="All Users"
        className="pt-6 xm:pt-16 text-[28px] leading-[34px] tracking-[1.4px]"
      />

      <UsersTable users={users} />
    </div>
  );
}
