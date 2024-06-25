import Table from "@/components/table/table";

import { useSchedule } from "../api/get-schedule";
import getColumns from "./schedule-columns";

type ScheduleProps = {
  teamId: string;
  seasonId: string;
};

const Schedule = ({ teamId, seasonId }: ScheduleProps) => {
  const scheduleQuery = useSchedule(seasonId, teamId);

  const columns = getColumns(parseInt(teamId));

  return (
    <Table
      title="Regular Season"
      columns={columns}
      data={scheduleQuery?.data}
    />
  );
};

export default Schedule;
