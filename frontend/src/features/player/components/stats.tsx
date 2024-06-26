import Table from "@/components/table/table";
import { columns } from "./columns";
import { usePlayerStats } from "../api/get-player-stats";

type StatsProps = {
  firstName: string;
  lastName: string;
};

const Stats = ({ firstName, lastName }: StatsProps) => {
  const playerStatsQuery = usePlayerStats(firstName, lastName);
  const playerStats = playerStatsQuery?.data;

  if (playerStatsQuery.isLoading) {
    return <></>;
  }

  const categories = ["Passing", "Rushing", "Receiving", "Defense"];

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
            <div className="pb-6">
              <Table
                title={category}
                columns={columns[index]}
                data={nonEmptySeasons}
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
