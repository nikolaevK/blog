import authenticate from "../actions/authenticate";
import DashboardSideBar from "./components/dashboard-side-bar";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  await authenticate();

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="hidden md:flex min-h-screen w-full ">
        <DashboardSideBar />
        {children}
      </div>
    </section>
  );
}
