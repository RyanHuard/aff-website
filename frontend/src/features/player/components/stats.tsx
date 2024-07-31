import Table from "@/components/table/table";
import { columns } from "./columns";
import { usePlayerStats } from "../api/get-player-stats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type StatsProps = {
  firstName: string;
  lastName: string;
};

const Stats = ({ firstName, lastName }: StatsProps) => {
  const playerStatsQuery = usePlayerStats(firstName, lastName);
  const playerStats = playerStatsQuery?.data;

  const categories = [
    "Passing",
    "Rushing",
    "Receiving",
    "Defense",
    "Kicking",
    "Punting",
  ];

  return (
    <div className="h-[500px]">
      {categories.map((category, index) => {
        const categoryKey = category.toLowerCase();
        const categoryStats = playerStats?.[categoryKey] ?? [];
        let nonEmptySeasons: any = [];

        categoryStats.map((season, index) => {
          nonEmptySeasons.push(season);
        });

        if (nonEmptySeasons.length > 0) {
          return (
            <div className="pb-6" key={index}>
              <Table
                title={category}
                columns={columns[index]}
                data={nonEmptySeasons}
                progressPending={playerStatsQuery.isLoading}
                dense
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Stats;
