import Card from "@/components/layouts/components/card";
import { usePlayerStats } from "@/features/stats/api/get-player-stats";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { PlayerStats } from "@/types/player";

type StatLeaderProps = {
  category: Category[];
  players: PlayerStats[];
};

type Category = {
  name: string;
  stat: string | string[];
};

function StatLeader({ category, players }: StatLeaderProps) {
  const leader: PlayerStats = players[0];
  players.shift();

  return (
    <div>
      <img
        src={`/players/${leader.first_name}_${leader.last_name}`}
        className="h-16"
      />
    </div>
  );
}

function StatLeadersCard() {
  const statsQuery = usePlayerStats(CURRENT_SEASON_ID.toString());
  const statsData = statsQuery?.data;

  const categories: Category = [
    {
      name: "Passing Yards",
      stat: "season_pass_yards",
    },
    {
      name: "Passing TDs",
      stat: "season_pass_tds",
    },
    {
      name: "Rushing Yards",
      stat: "season_rush_yards",
    },
    {
      name: "Receiving Yards",
      stat: "season_receiving_yards",
    },
    {
      name: "Total TDs",
      stat: ["season_receiving_tds", "season_rushing_tds"],
    },
    {
      name: "Sacks",
      stat: "season_defense_sacks",
    },
  ];

  return (
    <Card>
      {categories.map((category, index) => {
        return <StatLeader category={category} players={} />;
      })}
    </Card>
  );
}

export default StatLeadersCard;
