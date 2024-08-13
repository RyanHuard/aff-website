import { TeamDetails } from "@/types/game";
import { useEffect, useState } from "react";
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
import { CURRENT_SEASON_ID, SEASON_STAGE, TRADE_WINDOW } from "@/lib/utils";
import IncomingAsset from "./incoming-asset";
import { Button } from "@/components/ui/button";

type TeamTraderBoxProps = {
  userTeamDetails?: TeamDetails;
  teamDetails?: TeamDetails[] | undefined;
  handleToReceivingTeam?: any;
  handleToSendingTeam?: any;
  incomingAssets?: (PlayerDetail | DraftPickDetail)[];
  outgoingAssets?: (PlayerDetail | DraftPickDetail)[];
  handleSendTradeOffer?: any;
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

function TeamTraderBox({
  userTeamDetails,
  teamDetails,
  handleToReceivingTeam,
  handleToSendingTeam,
  incomingAssets,
  outgoingAssets,
  handleSendTradeOffer,
}: TeamTraderBoxProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(
    userTeamDetails?.team_id
  );
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDetail[]>([]);
  const [selectedDraftPicks, setSelectedDraftPicks] = useState<
    DraftPickDetail[]
  >([]);
  const [rosterCap, setRosterCap] = useState<number>(0);
  const [draftPicksCap, setDraftPicksCap] = useState<number>(0);

  const [isValidTrade, setIsValidTrade] = useState<boolean>(false);

  const direction = !!userTeamDetails ? "to_receiving_team" : "to_sending_team";

  if (!teamDetails && !userTeamDetails) {
    return <></>;
  }

  const rosterQuery = useRoster(selectedTeamId);
  const draftPicksQuery = useDraftPicks(selectedTeamId);

  function handleTeamSelect(e: string) {
    setSelectedTeamId(e);
    setSelectedPlayers([]);
    setSelectedDraftPicks([]);
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

  useEffect(() => {
    if (direction == "to_receiving_team") {
      handleToReceivingTeam(selectedPlayers, selectedDraftPicks);
    } else if (direction == "to_sending_team") {
      handleToSendingTeam(selectedPlayers, selectedDraftPicks);
    }
  }, [selectedPlayers, selectedDraftPicks]);

  useEffect(() => {
    if (incomingAssets!.length > 0 && outgoingAssets!.length > 0) {
      setIsValidTrade(true);
    } else {
      setIsValidTrade(false);
    }

    let rosterCapSpent = 0;
    let draftPicksCapSpent = 0;

    // Sum salaries of incomingAssets
    incomingAssets?.forEach((asset) => {
      if (asset && "salary" in asset) {
        rosterCapSpent += asset.salary;
      } else if (
        asset &&
        "round_num" in asset &&
        asset.season_id == CURRENT_SEASON_ID &&
        SEASON_STAGE == "preseason"
      ) {
        draftPicksCapSpent += 1;
      }
    });

    // Sum salaries of incomingAssets
    outgoingAssets?.forEach((asset) => {
      if (asset && "salary" in asset) {
        rosterCapSpent -= asset.salary;
      } else if (
        asset &&
        "round_num" in asset &&
        asset.season_id == CURRENT_SEASON_ID &&
        SEASON_STAGE == "preseason"
      ) {
        draftPicksCapSpent -= 1;
      }
    });

    // Sum salaries of players in rosterQuery?.data
    rosterQuery?.data?.forEach((player) => {
      if (player && "salary" in player) {
        rosterCapSpent += player.salary;
      }
    });

    draftPicksQuery?.data?.forEach((pick) => {
      if (pick.season_id == CURRENT_SEASON_ID && SEASON_STAGE == "preseason") {
        draftPicksCapSpent += 1;
      }
    });

    // Update capSpent state
    setRosterCap(rosterCapSpent);
    setDraftPicksCap(draftPicksCapSpent);
  }, [incomingAssets, outgoingAssets]);

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
      <div className="border-b-2 border-t w-full h-20 flex text-center *:flex-1 *:border-x *:pt-4 *:px-2 *:md:px-8 overflow-x-auto overflow-y-clip">
        <div className="">
          <h3 className="font-medium">$100.0M</h3>
          <p className="text-slate-500 text-xs">Max Cap</p>
        </div>
        <div className="">
          <h3 className="font-medium">
            ${100 - (rosterCap + draftPicksCap)}.0M
          </h3>
          <p className="text-slate-500 text-xs">Cap Space</p>
        </div>
        <div className="">
          <h3 className="font-medium">${rosterCap}.0M</h3>
          <p className="text-slate-500 text-xs">Roster Cap</p>
        </div>
        <div className="">
          <h3 className="font-medium">${draftPicksCap}.0M</h3>
          <p className="text-slate-500 text-xs">
            '{CURRENT_SEASON_ID + 21} Draft Picks
          </p>
        </div>
      </div>
      <div className="border-b-2 w-full">
        <div className="border-b p-1">
          <h2 className="text-center text-sm text-slate-500">Outgoing</h2>
          <div className="flex gap-4 p-2 flex-wrap">
            {outgoingAssets?.map(
              (asset: PlayerDetail | DraftPickDetail, index: number) => {
                return <IncomingAsset key={index} asset={asset} />;
              }
            )}
          </div>
        </div>
        <div className="p-1">
          <h2 className="text-center text-sm text-slate-500">Incoming</h2>
          <div className="flex gap-4 p-2 flex-wrap">
            {incomingAssets?.map(
              (asset: PlayerDetail | DraftPickDetail, index: number) => {
                return <IncomingAsset key={index} asset={asset} />;
              }
            )}
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="roster" className="p-2">
          <div className="w-full border-b-2 pb-2">
            <TabsList>
              <TabsTrigger value="roster">Roster</TabsTrigger>
              <TabsTrigger value="picks">Picks</TabsTrigger>
            </TabsList>
            {!!userTeamDetails && (
              <Button
                disabled={!isValidTrade || TRADE_WINDOW == "closed"}
                onClick={handleSendTradeOffer}
                className="bg-aff-blue rounded-none float-end"
              >
                Send Offer
              </Button>
            )}
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
