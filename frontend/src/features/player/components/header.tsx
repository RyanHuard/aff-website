import { TeamDetails } from "@/types/game.js";
import { calculateOverall, formatSalary } from "./helpers";

type HeaderProps = {
  playerDetails: any;
};

const Header = ({ playerDetails }: HeaderProps) => {
  const overall = calculateOverall(
    playerDetails?.position,
    playerDetails?.skill,
    playerDetails?.speed,
    playerDetails?.agility,
    playerDetails?.strength
  );

  return (
    <div className="border-b border-aff-blue bg-white sm:pt-6 pt-4 sm:mb-12 md:px-6">
      <div className="m-auto max-w-7xl border-b border-neutral-300 pb-6">
        <header className="flex">
          <img
            className="h-full w-48 md:w-56"
            src={`/players/${playerDetails?.fname}_${playerDetails?.lname}.png`}
            onError={(e: any) => {
              e.target.src = "/players/player_placeholder.png";
            }}
          />
          <div className="sm:flex px-4 md:px-8">
            <div className="sm:w-46">
              <div className="text-xl md:text-3xl">
                <div className="">{playerDetails?.fname}</div>
                <div className="font-bold">{playerDetails?.lname}</div>
              </div>
              <div className="flex sm:py-4 py-2 text-sm md:text-base">
                <img
                  className="-ml-1 w-6 md:w-8"
                  src={`/logos/${playerDetails?.team_details?.team_logo}`}
                />
                <span className="my-auto ml-1">
                  {playerDetails?.team_details?.team_location} ·{" "}
                  {playerDetails?.position}
                </span>
              </div>
            </div>

            <div className="mx-6 mb-6 hidden w-px bg-neutral-300 sm:block" />

            <div className="hidden gap-12 pt-1 text-sm font-semibold sm:flex">
              <ul className="md:space-y-4 space-y-[11px]">
                <li className="flex w-44 justify-between">
                  <div className="text-neutral-500">COLLEGE</div>
                  <div>{playerDetails?.college}</div>
                </li>
                {/* <li className="flex justify-between">
                <div className="text-neutral-500">PERSONALITY</div>
                <div>{playerInfo?.personality}</div>
              </li> */}
                <li className="flex justify-between">
                  <div className="text-neutral-500">AGE</div>
                  <div>{playerDetails?.age}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">CONTRACT</div>
                  <div>{playerDetails?.contract} years</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">SALARY</div>
                  <div>{formatSalary(playerDetails?.salary)}</div>
                </li>
              </ul>
              <ul className="space-y-4 hidden lg:block">
                <li className="flex justify-between">
                  <div className="text-neutral-500">OVERALL</div>
                  <div>{overall}</div>
                </li>
                <li className="flex w-44 justify-between">
                  <div className="text-neutral-500">SKILL</div>
                  <div>{playerDetails?.skill}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">SPEED</div>
                  <div>{playerDetails?.speed}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">AGILITY</div>
                  <div>{playerDetails?.agility}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">STRENGTH</div>
                  <div>{playerDetails?.strength}</div>
                </li>
              </ul>
            </div>

            <div className="text-xs sm:hidden block">
              <ul className="space-y-1 w-40">
                <li className="flex justify-between">
                  <div className="text-neutral-500">COLLEGE</div>
                  <div>{playerDetails?.college}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">PERSONALITY</div>
                  <div>{playerDetails?.personality}</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">CONTRACT</div>
                  <div>{playerDetails?.contract} Years</div>
                </li>
                <li className="flex justify-between">
                  <div className="text-neutral-500">SALARY</div>
                  <div>{formatSalary(playerDetails?.salary)}</div>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
      <div>{}</div>
    </div>
  );
};

export default Header;
