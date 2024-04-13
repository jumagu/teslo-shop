import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { Footer, TopMenu } from "@/components";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <main>
      <TopMenu isOnAuth />

      <div className="min-h-[calc(100vh-196px)] min-[600px]:min-h-[calc(100vh-124px)]">
        {children}
      </div>

      <Footer label="Contact" />
    </main>
  );
}
