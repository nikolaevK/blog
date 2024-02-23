import authenticate from "@/app/actions/authenticate";
import MobileNavBar from "./mobile-nav-bar";
import NonMobileNavBar from "./non-mobile-nav-bar";

export async function NavBar() {
  const authorized = await authenticate();
  return (
    <>
      <NonMobileNavBar authorized={authorized} />
      {/* Mobile Navigation */}
      <div className="pt-16 md:pt-0">
        <MobileNavBar authorized={authorized} />
      </div>
    </>
  );
}
