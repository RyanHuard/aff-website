import Table from "@/components/table/table";

import { useSchedule } from "../api/get-schedule";
import getColumns from "./schedule-columns";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type ScheduleProps = {
  teamId: string;
  seasonId: string;
};

const Schedule = ({ teamId, seasonId }: ScheduleProps) => {
  const scheduleQuery = useSchedule(seasonId, teamId);

  const columns = getColumns(parseInt(teamId));

  if (scheduleQuery.isLoading) {
    <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
      <LoadingSpinner size="lg" />
    </div>;
  }

  return (
    <Table
      title="Regular Season"
      columns={columns}
      data={scheduleQuery?.data}
      progressPending={scheduleQuery.isLoading}
    />
  );
};

export default Schedule;
