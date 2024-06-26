import { Link, NavLink, Outlet } from "react-router-dom";

import TeamLink from "../ui/team-link";
import Ticker from "./components/schedule-ticker";
import MobileNavbar from "./components/mobile-navbar";
import DesktopNavbar from "./components/desktop-navbar";

function TeamLogosHeader() {
  const logos = [
    "alaracers.png",
    "farfrost.png",
    "kencluck.png",
    "memrhythm.png",
    "okbison.png",
    "orlvoyagers.png",
    "sacannons.png",
    "shrsteamboats.png",
    "scseacows.png",
    "stlknights.png",
  ];

  const ids = [0, 6, 4, 1, 5, 7, 2, 8, 9, 3];

  return (
    <div className="bg-black h-14 justify-center gap-6 md:flex hidden ">
      {logos.map((team, id) => (
        <TeamLink teamId={ids[id]} className="my-auto" key={id}>
          <img src={`/logos/${team}`} className="h-10" />
        </TeamLink>
      ))}
    </div>
  );
}

function NavBar() {
  return (
    <nav className="h-14 bg-[#013369] lg:h-16">
      <MobileNavbar />
      <DesktopNavbar />
    </nav>
  );
}

function StatLeadersHeader() {
  return <div className="flex overflow-clip h-24"></div>;
}

export default function MainLayout() {
  return (
    <>
      <TeamLogosHeader />
      <Ticker />
      <NavBar />
      <Outlet />
    </>
  );
}
