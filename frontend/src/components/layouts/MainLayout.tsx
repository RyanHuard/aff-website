import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink, Outlet } from "react-router-dom";

function NavBar() {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams"];

  return (
    <NavigationMenu className="max-w-full bg-aff-blue h-16 justify-start px-16">
      <NavigationMenuList className="gap-4 font-semibold">
        {navbarRoutes.map((route) => (
          <NavigationMenuItem className="text-white font-sans">
            <NavLink to={`/${route.toLowerCase()}`}>
              <NavigationMenuLink>{route}</NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function MainLayout() {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}
