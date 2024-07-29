import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MdAccountBox } from "react-icons/md";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle, signOutWithGoogle } from "@/firebase";
import { Auth, User } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DesktopNavbarProps = {
  userTeam: any | null;
  currentUser: User | null;
};

function DesktopNavbar({ userTeam, currentUser }: DesktopNavbarProps) {
  const navigate = useNavigate();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto">
            <Button className="bg-transparent hover:bg-transparent" size="icon">
              <MdAccountBox color="white" size="32px" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-sm">
            <DropdownMenuItem
              onClick={currentUser ? signOutWithGoogle : signInWithGoogle}
              className="hover:cursor-grab"
            >
              {!currentUser ? <>Sign In</> : <>Sign Out</>}
            </DropdownMenuItem>
            {userTeam && (
              <>
                <DropdownMenuItem
                  className="hover:cursor-grab"
                  onClick={() => navigate(`/teams/${userTeam.teamId}`)}
                >
                  My Team
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-grab"
                  onClick={() => {
                    navigate(`/manager/trades`);
                    alert(
                      "The trade window is closed. You will not be able to create any trades."
                    );
                  }}
                >
                  Trades
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  );
}

export default DesktopNavbar;
