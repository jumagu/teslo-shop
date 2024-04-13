import { TopMenu, SideBar, NotFound, Footer } from "@/components";

export const metadata = {
  title: "Page Not Found",
  description: "Whoops! sorry about that.",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen">
      <TopMenu />

      <SideBar />

      <div className="flex items-center min-h-[calc(100vh-128px)] min-[600px]:min-h-[calc(100vh-92px)]">
        <NotFound />
      </div>

      <Footer label="Locations" />
    </main>
  );
}
