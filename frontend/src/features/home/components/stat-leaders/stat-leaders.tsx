import Card from "@/components/layouts/components/card";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { PlayerStats } from "@/types/player";
import { useStatLeaders } from "./api/get-stat-leaders";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Link } from "react-router-dom";

type StatLeaderProps = {
  category: any;
  players: PlayerStats[];
};

function StatLeader({ category, players }: StatLeaderProps) {
  const leader: PlayerStats = players?.[0];

  players = players?.slice(1);
  const statColumn = "season_" + category.stat;

  return (
    <div className="px-6 pt-2">
      <h2 className="py-2 font-bold">{category.name}</h2>
      <div className="flex pt-2 pb-4">
        <img
          src={`/players/${leader?.first_name}_${leader?.last_name}.png`}
          className="h-16 my-auto"
        />
        <div className="pl-4">
          <div>
            <span className="font-semibold text-2xl">
              {leader?.[statColumn]}
            </span>
            <span className="font-semibold text-sm text-slate-600">
              {" "}
              {category.description}
            </span>
          </div>
          <Link
            to={`/players/${leader?.first_name}-${leader?.last_name}`}
            className="font-semibold  text-slate-800 flex"
          >
            {leader?.first_name} {leader?.last_name}{" "}
          </Link>
          <div className="text-slate-600 text-sm flex">
            #{leader?.number} {leader?.position}
          </div>
        </div>
      </div>
      <div>
        {players?.map((player, rank) => {
          return (
            <div
              className="text-sm text-slate-600 border-t border-slate-300 py-2 px-4 w-full flex justify-between"
              key={rank}
            >
              <div className="flex [&>*]:my-auto ">
                <div className="w-12">#{player.number}</div>{" "}
                <Link
                  to={`/players/${player?.first_name}-${player?.last_name}`}
                  className="w-32 overflow-hidden  "
                >
                  {player?.first_name} {player?.last_name}
                </Link>
                <img src={`/logos/${player.team_logo}`} className="h-6" />
              </div>
              <span className="text-right my-auto">{player?.[statColumn]}</span>
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

  const categories = [
    {
      name: "Passing Yards per game",
      stat: "pass_yards",
      description: "PASS AVG",
    },
    {
      name: "Touchdown Passes",
      stat: "pass_tds",
      description: "TD",
    },
    {
      name: "Rushing Yards per game",
      stat: "rush_yards",
      description: "RUSH AVG",
    },
    {
      name: "Receiving Yards per game",
      stat: "receiving_yards",
      description: "REC AVG",
    },
    {
      name: "Total Touchdowns",
      stat: "total_touchdowns",
      description: "TOTAL TD",
    },
    {
      name: "Sacks",
      stat: "defense_sacks",
      description: "SACKS",
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
    <Card className="grid grid-cols-2 pb-4">
      <h1 className="py-3 px-4 bg-aff-blue col-span-2 text-white font-semibold">
        AFF {CURRENT_SEASON_ID + 2021} LEADERS
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
