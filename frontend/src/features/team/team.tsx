import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTeam } from "./api/get-team";
import Schedule from "./components/schedule";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import Header from "./components/header";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Stats from "./components/stats";
import Trades from "../trades/trades";

const Team = () => {
  const [tab, setTab] = useState<string>("Schedule");
  const [seasonId, setSeasonId] = useState("7");

  const { teamId } = useParams();

  let teamQuery = useTeam(teamId!);
  let team = teamQuery?.data?.[0];

  const handleTabChange = (e: string) => {
    setTab(e);
  };

  const handleSeasonSelect = (e: string) => {
    setSeasonId(e);
  };

  if (teamQuery.isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header
        team={team}
        seasonId={seasonId}
        handleSeasonSelect={handleSeasonSelect}
        handleTabChange={handleTabChange}
      />
      <ContentLayout>
        {tab == "Schedule" ? (
          <Schedule teamId={teamId ?? ""} seasonId={seasonId} />
        ) : tab == "Stats" ? (
          <Stats teamCity={team?.abbreviation ?? ""} seasonId={seasonId} />
        ) : tab == "Trades" ? (
          <Trades />
        ) : (
          <></>
        )}
      </ContentLayout>
    </>
  );
};

export default Team;
