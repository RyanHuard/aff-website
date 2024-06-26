import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function DesktopNavbar() {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams"];
  return (
    <div className="max-w-full bg-aff-blue h-16 2xl:px-16 px-6 hidden md:block">
      <NavigationMenu className="justify-start h-full max-w-7xl mx-auto">
        <NavigationMenuList className="gap-6 font-semibold">
          <Link to={"/"}>
            <img src="/aff-logo.png" className="h-10" />
          </Link>
          {navbarRoutes.map((route, i) => (
            <NavigationMenuItem className="text-white font-sans" key={i}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "decoration-2 underline-offset-[6px] underline"
                    : "hover:decoration-2 hover:underline-offset-[6px] hover:underline "
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

export default DesktopNavbar;
