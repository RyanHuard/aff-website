import { TeamDetails } from "@/types/game";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoster } from "../api/get-roster";

type TeamTraderBoxProps = {
  userTeamDetails?: TeamDetails | undefined;
  teamDetails?: TeamDetails[] | undefined;
};

function TeamTraderBox({ userTeamDetails, teamDetails }: TeamTraderBoxProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>(
    userTeamDetails?.team_id
  );

  if (!teamDetails && !userTeamDetails) {
    return <></>;
  }

  const rosterQuery = useRoster(selectedTeamId);

  function handleTeamSelect(e: string) {
    setSelectedTeamId(e);
  }

  return (
    <div className="w-1/2 bg-white">
      {teamDetails && Array.isArray(teamDetails) && (
        <Select onValueChange={(e) => handleTeamSelect(e)}>
          <SelectTrigger value={selectedTeamId}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="-ml-3 xl:ml-0">
            {teamDetails?.map((team, index) => (
              <SelectItem value={team.team_id} key={index} className="border-b">
                <div className="flex">
                  <img className="w-7" src={`/logos/${team.team_logo}`} />
                  <span className="my-auto pl-2">
                    {team?.team_location} {team?.team_name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div>
        {rosterQuery?.data?.map((player, index) => {
          return (
            <div>
              {player.position} {player.lname}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamTraderBox;
