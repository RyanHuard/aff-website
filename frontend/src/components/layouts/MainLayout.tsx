import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink, Outlet } from "react-router-dom";

function TeamLogosHeader() {
  return <div className="bg-black h-14"></div>;
}

function NavBar() {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams"];

  return (
    <div className="max-w-full bg-aff-blue h-16 px-16">
      <NavigationMenu className="justify-start h-full max-w-7xl mx-auto">
        <NavigationMenuList className="gap-6 font-semibold ">
          {navbarRoutes.map((route) => (
            <NavigationMenuItem className="text-white font-sans">
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

function StatLeadersHeader() {
  return <div className="h-24 bg-slate-50"></div>;
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
