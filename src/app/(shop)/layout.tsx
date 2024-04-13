import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />

      <SideBar />

      <div className="min-h-[calc(100vh-128px)] min-[600px]:min-h-[calc(100vh-92px)]">
        {children}
      </div>

      <Footer label="Locations" />
    </main>
  );
}
