import React from "react";

import { GameDetails } from "@/types/game";
import Game from "./game";

type WeekProps = {
  schedule: GameDetails[] | undefined;
  seasonIdString: string;
  weekId: string;
};

export default function Week({ schedule, seasonIdString, weekId }: WeekProps) {
  let seasonId = parseInt(seasonIdString);
  let gamesPerWeek = 5;

  if (seasonId >= 6) {
    gamesPerWeek = 5;
  } else if (seasonId >= 3) {
    gamesPerWeek = 3;
  } else {
    gamesPerWeek = 2;
  }

  function calculateGameIndex(
    index: number,
    weekId: number,
    gamesPerWeek: number
  ) {
    return index + (weekId - 1) * gamesPerWeek;
  }

  function makeWeek(weekId: number, gamesPerWeek: number) {
    let games = [];

    for (let i = 0; i < gamesPerWeek; i++) {
      let gameIndex = calculateGameIndex(i, weekId, gamesPerWeek);
      let game = schedule?.[gameIndex];
      games.push(<Game {...game} key={i} />);
    }

    return games;
  }

  return (
    <div className="lg:px-4 xl:px-0 px-2 sm:pt-0 pt-4">
      <h1 className="md:text-2xl text-xl font-bold pb-3 sm:pb-6">
        Season {seasonId} - Week {weekId}
      </h1>
      {makeWeek(parseInt(weekId), gamesPerWeek)}
    </div>
  );
}
