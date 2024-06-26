import React from "react";

import { Link } from "react-router-dom";
import { usePlayerStats } from "../api/get-player-stats";
import { TeamDetails } from "@/types/game";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Table from "@/components/table/table";
import { columns } from "./columns";

type StatsProps = {
  teamCity: string;
  seasonId: string;
};

const Stats = ({ teamCity, seasonId }: StatsProps) => {
  const playerStatsQuery = usePlayerStats(seasonId, teamCity);
  const playerStatsData = playerStatsQuery?.data;

  let teamLeaders;

  if (playerStatsQuery.isFetched) {
    // Find the player with the highest passing yards
    const maxPassingYards = Math.max(
      ...playerStatsData?.passing.map((player) => player.season_pass_yards)
    );
    const playerWithMaxPassingYards = playerStatsData?.passing.find(
      (player) => player.season_pass_yards === maxPassingYards
    );

    // Find the player with the highest rushing yards
    const maxRushYards = Math.max(
      ...playerStatsData?.rushing.map((player) => player.season_rush_yards)
    );
    const playerWithMaxRushYards = playerStatsData?.rushing.find(
      (player) => player.season_rush_yards === maxRushYards
    );

    // Find the player with the highest receiving yards
    const maxReceivingYards = Math.max(
      ...playerStatsData?.receiving.map(
        (player) => player.season_receiving_yards
      )
    );
    const playerWithMaxReceivingYards = playerStatsData?.receiving.find(
      (player) => player.season_receiving_yards === maxReceivingYards
    );

    // Find the player with the most tackles
    const maxTackles = Math.max(
      ...playerStatsData?.defense.map((player) => player.season_defense_tackles)
    );
    const playerWithMaxTackles = playerStatsData?.defense.find(
      (player) => player.season_defense_tackles === maxTackles
    );

    // Find the player with the most sacks
    const maxSacks = Math.max(
      ...playerStatsData?.defense.map((player) => player.season_defense_sacks)!
    );
    const playerWithMaxSacks = playerStatsData?.defense.find(
      (player) => player.season_defense_sacks === maxSacks
    );

    teamLeaders = [
      {
        Passing: {
          firstName: playerWithMaxPassingYards?.first_name,
          lastName: playerWithMaxPassingYards?.last_name,
          leadingStat: playerWithMaxPassingYards?.season_pass_yards,
          position: playerWithMaxPassingYards?.position,
        },
      },
      {
        Rushing: {
          firstName: playerWithMaxRushYards?.first_name,
          lastName: playerWithMaxRushYards?.last_name,
          leadingStat: playerWithMaxRushYards?.season_rush_yards,
          position: playerWithMaxRushYards?.position,
        },
      },
      {
        Receiving: {
          firstName: playerWithMaxReceivingYards?.first_name,
          lastName: playerWithMaxReceivingYards?.last_name,
          leadingStat: playerWithMaxReceivingYards?.season_receiving_yards,
          position: playerWithMaxReceivingYards?.position,
        },
      },
      {
        Tackles: {
          firstName: playerWithMaxTackles?.first_name,
          lastName: playerWithMaxTackles?.last_name,
          leadingStat: playerWithMaxTackles?.season_defense_tackles,
          position: playerWithMaxTackles?.position,
        },
      },
      {
        Sacks: {
          firstName: playerWithMaxSacks?.first_name,
          lastName: playerWithMaxSacks?.last_name,
          leadingStat: playerWithMaxSacks?.season_defense_sacks,
          position: playerWithMaxSacks?.position,
        },
      },
    ];
  }

  if (playerStatsQuery.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" className="sm:bottom-86 relative bottom-64" />
      </div>
    );
  }

  return (
    <div className="pb-6">
      <div className="w-full overflow-x-auto bg-white font-bold drop-shadow sm:mb-6">
        <h1 className="h-[50px] border-b border-[#ffa500] px-3 py-3 text-lg">
          Team Leaders
        </h1>
        <div className="flex h-24 font-normal">
          {teamLeaders?.map((player, index) => {
            const category = Object.keys(player);
            const playerData = player[category];
            const playerName = `${playerData.firstName}_${playerData.lastName}`;
            const src = `/players/${playerName}.png`;
            const fallbackSrc = "/players/player_placeholder.png";

            return (
              <div className="flex-shrink-0 flex-grow border border-neutral-200 px-3 py-2 text-sm ">
                <h1 className="font-medium">{category}</h1>
                <Link
                  to={`/players/${playerData?.firstName
                    ?.toLowerCase()
                    .replaceAll(
                      " ",
                      "-"
                    )}-${playerData?.lastName?.toLowerCase()}`}
                >
                  <div className="flex pt-1">
                    <img
                      width="48px"
                      className="self-center"
                      src={src}
                      onError={(e: any) => {
                        e.target.src = fallbackSrc;
                      }}
                    />
                    <div className="whitespace-nowrap pl-3">
                      <span className="flex">
                        <span className="hidden lg:block">
                          {playerData.firstName} {playerData.lastName}
                        </span>
                        <span className="block lg:hidden">
                          {playerData.firstName?.charAt(0)}.{" "}
                          {playerData.lastName}
                        </span>
                        <span className="my-auto pl-1 text-xs text-neutral-500">
                          · {playerData.position}
                        </span>
                      </span>

                      <div className="text-2xl font-bold">
                        {playerData.leadingStat}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col sm:gap-6">
        <Table
          title="Passing"
          dense
          defaultSortFieldId={2}
          data={playerStatsData?.passing}
          columns={columns[0]}
          progressPending={playerStatsQuery.isLoading}
        />

        <Table
          title="Rushing"
          dense
          defaultSortFieldId={2}
          data={playerStatsData?.rushing}
          columns={columns[1]}
          rogressPending={playerStatsQuery.isLoading}
        />

        <Table
          title="Receiving"
          dense
          defaultSortFieldId={2}
          data={playerStatsData?.receiving}
          columns={columns[2]}
          progressPending={playerStatsQuery.isLoading}
        />

        <Table
          title="Defense"
          dense
          defaultSortFieldId={2}
          data={playerStatsData?.defense}
          columns={columns[3]}
          progressPending={playerStatsQuery.isLoading}
        />
      </div>
    </div>
  );
};

export default Stats;
