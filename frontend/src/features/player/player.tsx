import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDetails } from "./api/get-player-details";
import Header from "./components/header";
import { useTeam } from "../team/api/get-team";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import Stats from "./components/stats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Player = () => {
  const [tabIndex, setTabIndex] = useState(0);

  let { name } = useParams() as { name: string };

  let firstName = name?.split("-")[0];
  let lastName = name?.split("-").slice(1).join("-");

  const playerDetailsQuery = usePlayerDetails(firstName, lastName);
  const playerDetails = playerDetailsQuery?.data;

  if (playerDetailsQuery.isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleTabChange = (e: any) => {
    setTabIndex(e);
  };

  return (
    <div>
      <Header playerDetails={playerDetails} />
      <ContentLayout>
        <Stats firstName={firstName} lastName={lastName} />
      </ContentLayout>
    </div>
  );
};

export default Player;
