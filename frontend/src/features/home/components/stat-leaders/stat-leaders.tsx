import Card from "@/components/layouts/components/card";
import { usePlayerStats } from "@/features/stats/api/get-player-stats";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { PlayerStats } from "@/types/player";
import { useStatLeaders } from "./api/get-stat-leaders";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type StatLeaderProps = {
  category: any;
  players: PlayerStats[];
};

function StatLeader({ category, players }: StatLeaderProps) {
  const leader: PlayerStats = players?.[0];

  players = players?.slice(1);
  const statColumn = "season_" + category.stat;

  return (
    <div className="">
      <h2 className="px-2 py-2 font-semibold border-y border-black">
        {category.name} this season
      </h2>
      <div className="flex pt-2">
        <img
          src={`/players/${leader?.first_name}_${leader?.last_name}.png`}
          className="h-16"
        />
        <div>
          1. {leader?.first_name} {leader?.last_name} {leader?.[statColumn]}
        </div>
      </div>
      <div>
        {players?.map((player, rank) => {
          return (
            <div key={rank}>
              {rank + 2}. {player?.first_name} {player?.last_name}{" "}
              {player?.[statColumn]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatLeadersCard() {
  const statsQuery = useStatLeaders(CURRENT_SEASON_ID.toString());
  const statsData = statsQuery?.data;

  const categories: Category = [
    {
      name: "Passing Yards",
      stat: "pass_yards",
    },
    {
      name: "Passing TDs",
      stat: "pass_tds",
    },
    {
      name: "Rushing Yards",
      stat: "rush_yards",
    },
    {
      name: "Receiving Yards",
      stat: "receiving_yards",
    },
    {
      name: "Total TDs",
      stat: "total_touchdowns",
    },
    {
      name: "Sacks",
      stat: "defense_sacks",
    },
  ];

  if (statsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" className="relative bottom-64 sm:bottom-86" />
      </div>
    );
  }

  return (
    <Card className="grid grid-cols-2 ">
      <h1 className="py-3 px-4 bg-aff-blue col-span-2 text-white font-semibold">
        SEASONAL STAT LEADERS
      </h1>
      {categories.map((category: any, index: number) => {
        return (
          <StatLeader
            category={category}
            players={statsData?.[category.stat]!}
            key={index}
          />
        );
      })}
    </Card>
  );
}

export default StatLeadersCard;
