import Card from "@/components/layouts/components/card";
import { usePlayerStats } from "@/features/stats/api/get-player-stats";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { PlayerStats } from "@/types/player";
import { useStatLeaders } from "./api/get-stat-leaders";

type StatLeaderProps = {
  category: Category[];
  players: PlayerStats[];
};

type Category = {
  name: string;
  stat: string;
};

function StatLeader({ category, players }: StatLeaderProps) {
  const leader: PlayerStats = players?.[0];
  players?.shift();
  console.log(players);

  return (
    <div>
      <div className="flex">
        <img
          src={`/players/${leader?.first_name}_${leader?.last_name}.png`}
          className="h-16"
        />
        <div>
          {leader?.first_name} {leader?.last_name}
        </div>
      </div>
      <div>
        {players?.map((player, rank) => {
          return (
            <div>
              {player?.first_name} {player?.last_name}
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

  return (
    <Card>
      {categories.map((category, index) => {
        return (
          <StatLeader
            category={category}
            players={statsData?.[category.stat]!}
          />
        );
      })}
    </Card>
  );
}

export default StatLeadersCard;
