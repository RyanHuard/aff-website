import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, Outlet } from "react-router-dom";

import { useStatLeadersWeekly } from "./api/get-stat-leaders";
import WeeklyStatLeaderBox from "./components/weekly-stat-leaders";

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

  return (
    <div className="bg-black h-14 justify-center gap-6 md:flex hidden">
      {logos.map((team, id) => (
        <img src={`/logos/${team}`} className="h-10 my-auto" key={id} />
      ))}
    </div>
  );
}

function NavBar() {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams"];

  return (
    <div className="max-w-full bg-aff-blue h-16 px-16">
      <NavigationMenu className="justify-start h-full max-w-7xl mx-auto">
        <NavigationMenuList className="gap-6 font-semibold">
          <img src="aff-logo.png" className="h-10" />
          {navbarRoutes.map((route, i) => (
            <NavigationMenuItem className="text-white font-sans" key={i}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "decoration-2 underline-offset-4 underline"
                    : "hover:decoration-2 hover:underline-offset-4 hover:underline "
                }
                to={`/${route.toLowerCase()}`}
              >
                {route}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function StatLeadersHeader() {
  const statLeadersWeeklyQuery = useStatLeadersWeekly();

  if (statLeadersWeeklyQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <WeeklyStatLeaderBox
        category="Passing Yards"
        players={statLeadersWeeklyQuery?.data?.["passing_yards"]}
      />
      <WeeklyStatLeaderBox
        category="Passing TDs"
        players={statLeadersWeeklyQuery?.data?.["passing_tds"]}
      />
      <WeeklyStatLeaderBox
        category="Rushing Yards"
        players={statLeadersWeeklyQuery?.data?.["rushing"]}
      />
      <WeeklyStatLeaderBox
        category="Receiving Yards"
        players={statLeadersWeeklyQuery?.data?.["receiving"]}
      />
    </div>
  );
}

export default function MainLayout() {
  return (
    <>
      <TeamLogosHeader />
      <StatLeadersHeader />
      <NavBar />
      <Outlet />
    </>
  );
}
