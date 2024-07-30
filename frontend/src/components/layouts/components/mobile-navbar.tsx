import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { Button } from "@/components/ui/button";
import SideNavigation from "./side-navigation";

const MobileNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  // Inherits height because the wrapper div changes height of navbar.
  // the divs are needed for mobile visibility being hidden and display
  return (
    <div
      className="px-6 flex items-center justify-between md:hidden b"
      style={{ height: "inherit" }}
    >
      <Link to="/" onClick={() => setOpenSidebar(false)}>
        <img src="/aff-logo.png" className="mr-4 h-9 lg:h-10" />
      </Link>
      {!openSidebar ? (
        <Button
          onClick={() => setOpenSidebar(true)}
          className="bg-aff-blue active:bg-aff-blue"
          size="icon"
        >
          <GiHamburgerMenu size="24px" />
        </Button>
      ) : (
        <Button
          onClick={() => setOpenSidebar(false)}
          className="bg-aff-blue active:bg-aff-blue"
          size="icon"
        >
          <IoMdClose size="24px" />
        </Button>
      )}
      {openSidebar && <SideNavigation setOpenSidebar={setOpenSidebar} />}
    </div>
  );
};

export default MobileNavbar;
