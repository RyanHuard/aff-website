import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SeasonSelect from "@/components/ui/season-select";
import { useState } from "react";
import { auth } from "@/firebase";
import { useUserTeam } from "@/hooks/use-user-team";

type HeaderProps = {
  team: any;
  handleSeasonSelect: (e: string) => void;
  handleTabChange: (e: string) => void;
  seasonId: string;
};

const Header = ({
  team,
  handleSeasonSelect,
  seasonId,
  handleTabChange,
}: HeaderProps) => {
  const [tabValue, setTabValue] = useState<string>("Schedule");
  const userTeam = useUserTeam();

  const background = { borderColor: `${team?.primary_color}` };
  console.log(tabValue)
  return (
    <div className="bg-white sm:mb-12">
      <div style={background} className={`whitespace-nowrap border-b-2 pt-6`}>
        <div className="m-auto px-2">
          <header className="mx-auto flex max-w-7xl border-b border-neutral-300 pb-4">
            <img className="w-20 md:w-24" src={`/logos/${team?.team_logo}`} />
            <div className="my-auto px-2 md:px-4">
              <div className="text-xl md:text-3xl">
                {team?.team_location}{" "}
                <span className="font-bold">{team?.team_name}</span>
              </div>
              <div>
                ({team?.wins}-{team?.loss}) ·{" "}
                {team?.division?.[0].toUpperCase()}
                {team?.division?.slice(1)}
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="py-2 xl:px-0 px-2">
          <Tabs defaultValue="schedule">
            <TabsList
              onFocus={(e) => {
                handleTabChange(e.target.textContent!);
                setTabValue(e.target.textContent!);
              }}
            >
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              {userTeam && <TabsTrigger value="trades">Trades</TabsTrigger>}
            </TabsList>
          </Tabs>
        </div>
        {tabValue !== "Trades" && 
        <div className="py-3 bg-white border-t-2 border-gray-300 xl:px-0 px-2">
          <SeasonSelect
            value={seasonId}
            handleSeasonSelect={handleSeasonSelect}
            statYearsOnly={tabValue === "Stats" ? true : false}
          />
        </div>}
      </div>
    </div>
  );
};

export default Header;
