import React, { useState } from "react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Week from "./components/week";
import { useSchedule } from "./api/get-schedule";

const Schedule = () => {
  const [seasonId, setSeasonId] = useState<string>("7");
  const [weekId, setWeekId] = useState("1");

  const handleSeasonSelect = (e: string) => {
    setSeasonId(e);
  };

  const handleWeekSelect = (e: string) => {
    setWeekId(e);
  };

  let scheduleQuery = useSchedule(seasonId);

  return (
    <>
      {scheduleQuery?.isLoading ? (
        <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <Week
          seasonIdString={seasonId}
          weekId={weekId}
          schedule={scheduleQuery.data}
        />
      )}
    </>
  );
};

export default Schedule;
