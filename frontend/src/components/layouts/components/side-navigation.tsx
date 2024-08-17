import React from "react";
import { Link } from "react-router-dom";

const SideNavigation = ({ setOpenSidebar }) => {
  const navbarRoutes = ["Standings", "Schedule", "Stats", "Teams", "Trades"];
  return (
    <>
      <div
        className="fixed z-50 left-0 top-36 h-screen w-screen
        flex-col overflow-y-auto bg-[#013369]"
      >
        <div className="flex flex-col align-middle text-white">
          {navbarRoutes.map((route, index) => {
            return (
              <Link
                to={route.toLowerCase()}
                key={index}
                className="text-l m-2 font-semibold mx-auto"
                onClick={() => setOpenSidebar(false)}
              >
                {route}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
