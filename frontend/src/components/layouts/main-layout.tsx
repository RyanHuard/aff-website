import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, Outlet } from "react-router-dom";

import { useStatLeadersWeekly } from "./api/get-stat-leaders";
import WeeklyStatLeaderBox from "./components/weekly-stat-leaders";

function TeamLogosHeader() {
  return <div className="bg-black h-14"></div>;
}

function NavBar() {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams"];

  return (
    <div className="max-w-full bg-aff-blue h-16 px-16">
      <NavigationMenu className="justify-start h-full max-w-7xl mx-auto">
        <NavigationMenuList className="gap-6 font-semibold ">
          {navbarRoutes.map((route, i) => (
            <NavigationMenuItem className="text-white font-sans" key={i}>
              <NavLink to={`/${route.toLowerCase()}`}>
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
  console.log(statLeadersWeeklyQuery);
  if (statLeadersWeeklyQuery.isLoading) {
    return <div>Loading...</div>
  }

  return <WeeklyStatLeaderBox category="Passing Yards" players={statLeadersWeeklyQuery?.data?.["passing_yards"]}/>;
}

export default function MainLayout() {
  return (
    <>
      <TeamLogosHeader />
      <StatLeadersHeader />
      <NavBar />
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
    </>
  );
}
