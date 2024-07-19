import { TeamDetails } from "@/types/game";
import { useState } from "react";
import { IoIosAddCircleOutline, IoIosCheckmarkCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoster } from "../api/get-roster";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DraftPickDetail, PlayerDetail } from "@/types/types";
import { useDraftPicks } from "../api/get-draft-picks";
import { Badge } from "@/components/ui/badge";

type TeamTraderBoxProps = {
  userTeamDetails?: TeamDetails;
  teamDetails?: TeamDetails[] | undefined;
};

type PlayerProps = {
  player: PlayerDetail;
  selectedPlayers: PlayerDetail[];
  handlePlayerSelect: (player: PlayerDetail) => void;
};

type DraftPickProps = {
  draftPick: DraftPickDetail;
  selectedDraftPicks: DraftPickDetail[];
  handleDraftPickSelect: (draftPick: DraftPickDetail) => void;
};

function TeamTraderBox({ userTeamDetails, teamDetails }: TeamTraderBoxProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(
    userTeamDetails?.team_id
  );
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDetail[]>([]);
  const [selectedDraftPicks, setSelectedDraftPicks] = useState<
    DraftPickDetail[]
  >([]);

  const direction = !!userTeamDetails ? "to_receiving_team" : "to_sending_team";

  if (!teamDetails && !userTeamDetails) {
    return <></>;
  }

  const rosterQuery = useRoster(selectedTeamId);
  const draftPicksQuery = useDraftPicks(selectedTeamId);

  function handleTeamSelect(e: string) {
    setSelectedTeamId(e);
  }

  function handlePlayerSelect(player: PlayerDetail) {
    setSelectedPlayers((prevPlayers) => {
      // Ensure prevPlayers is an array
      const players = prevPlayers ?? [];

      const isSelected = players.some((p) => p.pid === player.pid);

      if (isSelected) {
        // If the player is already selected, remove them
        return players.filter((p) => p.pid !== player.pid);
      } else {
        // If the player is not selected, add them
        return [...players, player];
      }
    });
  }

  function handleDraftPickSelect(draftPick: DraftPickDetail) {
    setSelectedDraftPicks((prevDraftPicks) => {
      // Ensure prevPlayers is an array
      const draftPicks = prevDraftPicks ?? [];

      const isSelected = draftPicks.some(
        (p) => p.draft_pick_id === draftPick.draft_pick_id
      );

      if (isSelected) {
        // If the player is already selected, remove them
        return draftPicks.filter(
          (p) => p.draft_pick_id !== draftPick.draft_pick_id
        );
      } else {
        // If the player is not selected, add them
        return [...draftPicks, draftPick];
      }
    });
  }

  return (
    <div className="lg:w-1/2 w-full bg-white h-full">
      {teamDetails && Array.isArray(teamDetails) ? (
        <Select onValueChange={(e) => handleTeamSelect(e)}>
          <SelectTrigger className="py-6 text-base" value={selectedTeamId}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="-ml-3 xl:ml-0">
            {teamDetails?.map((team, index) => (
              <SelectItem
                value={team.team_id}
                key={index}
                className="text-base border-b"
              >
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
      ) : (
        <Select disabled defaultValue={selectedTeamId}>
          <SelectTrigger className="py-6 text-base" value={selectedTeamId}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={userTeamDetails?.team_id ?? "0"}
              className="border-b"
            >
              <div className="flex">
                <img
                  className="w-7"
                  src={`/logos/${userTeamDetails?.team_logo}`}
                />
                <span className="my-auto pl-2">
                  {userTeamDetails?.team_location} {userTeamDetails?.team_name}
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
      <div className="border-y-2 w-full">
        <div className="border-b p-1">
          <h2 className="text-center text-sm text-slate-500">Outgoing</h2>
        </div>
        <div className="p-1">
          <h2 className="text-center text-sm text-slate-500">Incoming</h2>
        </div>
      </div>
      <div>
        <Tabs defaultValue="roster" className="p-2">
          <div className="w-full border-b-2 pb-2">
            <TabsList>
              <TabsTrigger value="roster">Roster</TabsTrigger>
              <TabsTrigger value="picks">Picks</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="roster">
            {rosterQuery?.data?.map((player) => (
              <Player
                player={player}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={handlePlayerSelect}
                key={player.pid}
              />
            ))}
          </TabsContent>
          <TabsContent value="picks">
            {draftPicksQuery?.data?.map((draftPick) => (
              <DraftPick
                draftPick={draftPick}
                selectedDraftPicks={selectedDraftPicks}
                handleDraftPickSelect={handleDraftPickSelect}
                key={draftPick.draft_pick_id}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Player({ player, selectedPlayers, handlePlayerSelect }: PlayerProps) {
  const playerName = `${player.fname}_${player.lname}`;
  const src = `/players/${playerName}.png`;
  const fallbackSrc = "/players/player_placeholder.png";
  const isSelected = selectedPlayers.some((p) => p.pid === player.pid);

  return (
    <div className="border-b first:-mt-2">
      <div className="flex w-full border-b border-dashed border-slate-300 items-center py-px">
        <div className="flex">
          <img
            src={src}
            onError={(e: any) => {
              e.target.src = fallbackSrc;
            }}
            className="w-14"
          />
          <div className="px-2 my-auto">
            <div>
              {player.fname} {player.lname}
            </div>
            <div className="text-sm text-slate-500">
              {player.position}, {player.age} yo
            </div>
          </div>
        </div>
        <div className="ml-auto text-center px-2">
          <div className="font-medium">${player.salary}.0M</div>
          <div className="text-sm text-slate-500">{player.contract}yrs</div>
        </div>
        <button
          onClick={() => handlePlayerSelect(player)}
          className="px-2 text-aff-blue"
        >
          <IoIosAddCircleOutline
            className={`${isSelected ? "hidden" : "block"}`}
            size="32"
          />
          <IoIosCheckmarkCircle
            className={`${isSelected ? "block" : "hidden"}`}
            size="32"
          />
        </button>
      </div>
      <div className="flex px-8 md:px-16 justify-between text-xs py-1">
        <div>
          {player.skill} <span className="text-slate-500">SKL</span>
        </div>
        <div>
          {player.speed} <span className="text-slate-500">SPD</span>
        </div>
        <div>
          {player.agility} <span className="text-slate-500">AGL</span>
        </div>
        <div>
          {player.strength} <span className="text-slate-500">STR</span>
        </div>
      </div>
    </div>
  );
}

function DraftPick({
  draftPick,
  selectedDraftPicks,
  handleDraftPickSelect,
}: DraftPickProps) {
  const isSelected = selectedDraftPicks.some(
    (p) => p.draft_pick_id === draftPick.draft_pick_id
  );

  return (
    <div className="border-b first:-mt-2 flex h-[54px] items-center pl-2">
      <div>
        {draftPick.season_id + 2021} - Round {draftPick.round_num}{" "}
        {draftPick.pick_num && <>(Pick {draftPick.pick_num})</>}
      </div>
      <button
        onClick={() => handleDraftPickSelect(draftPick)}
        className="px-2 text-aff-blue ml-auto"
      >
        <IoIosAddCircleOutline
          className={`${isSelected ? "hidden" : "block"}`}
          size="32"
        />
        <IoIosCheckmarkCircle
          className={`${isSelected ? "block" : "hidden"}`}
          size="32"
        />
      </button>
    </div>
  );
}

export default TeamTraderBox;
