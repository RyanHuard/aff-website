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
    <div className="bg-aff-blue">
      <NavigationMenu>
        <NavigationMenuList>
          {navbarRoutes.map((route) => (
            <NavigationMenuItem>
              <NavLink to={`/${route.toLowerCase()}`}>
                <NavigationMenuLink>{route}</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
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
