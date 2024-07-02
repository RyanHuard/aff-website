import { Link, NavLink, Outlet } from "react-router-dom";

import TeamLink from "../ui/team-link";
import Ticker from "./components/schedule-ticker";
import MobileNavbar from "./components/mobile-navbar";
import DesktopNavbar from "./components/desktop-navbar";
import { useEffect, useState } from "react";
import { auth, getUserTeam } from "@/firebase";
import { useUserTeam } from "@/hooks/use-user-team";

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
 const userTeam = useUserTeam();

  return (
    <nav className="h-14 bg-[#013369] md:h-16">
      <MobileNavbar userTeam={userTeam} />
      <DesktopNavbar userTeam={userTeam} currentUser={auth.currentUser} />
    </nav>
  );
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
