import React from "react";

import columns from "./columns";
import Table from "@/components/table/table";
import { useStandings } from "../api/get-standings";

type StandingsProps = {
  seasonIdString: string;
};

const Tables = ({ seasonIdString }: StandingsProps) => {
  const standingsQuery = useStandings(seasonIdString);

  let seasonId: number = parseInt(seasonIdString);

  if (seasonId <= 5) {
    return (
      <div className="m-auto my-0 pb-6 sm:my-12">
        <div className="mb-6 border-2">
          <Table
            title="American Football Federation"
            data={standingsQuery?.data}
            columns={columns}
            progressPending={standingsQuery.isLoading}
          />
        </div>
      </div>
    );
  } else if (seasonId >= 6) {
    const westTeams = standingsQuery?.data?.filter(
      (team: any) => team.division === "west"
    );
    const eastTeams = standingsQuery?.data?.filter(
      (team: any) => team.division === "east"
    );

    return (
      <div className="max-w-screen">
        <div className="mb-0 border md:mb-6 ">
          <Table
            title="West"
            data={westTeams}
            columns={columns}
            progressPending={standingsQuery.isLoading}
          />
        </div>

        <div className="border-2">
          <Table
            title="East"
            data={eastTeams}
            columns={columns}
            progressPending={standingsQuery.isLoading}
          />
        </div>
      </div>
    );
  }
};

export default Tables;
