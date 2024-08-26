import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenu />

      <SideBar />

      <main className="min-h-[calc(100vh-128px)] min-[600px]:min-h-[calc(100vh-92px)]">
        {children}
      </main>

      <Footer label="Locations" />
    </div>
  );
}
