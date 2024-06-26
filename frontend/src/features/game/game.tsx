import React from "react";
import { useParams } from "react-router-dom";

import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { useGameStats } from "./api/get-game-stats";
import { useGameDetails } from "./api/get-game-details";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import BoxScore from "./components/box-score";
import Header from "./components/header";

const Game = () => {
  let { gameId } = useParams();

  if (gameId == undefined) {
    return <div>Game does not exist.</div>;
  }

  let gameDetailsQuery = useGameDetails(gameId);
  let gameStatsQuery = useGameStats(gameId);

  if (gameStatsQuery.isLoading || gameDetailsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" className="relative bottom-64 sm:bottom-86" />
      </div>
    );
  }

  return (
    <>
      <Header game={gameDetailsQuery?.data} />
      <ContentLayout>
        <BoxScore
          boxScore={gameStatsQuery?.data}
          game={gameDetailsQuery?.data}
        />
      </ContentLayout>
    </>
  );
};

export default Game;
