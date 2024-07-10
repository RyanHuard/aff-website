import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSchedule } from "../api/get-schedule";
import Carousel from "./carousel";
import Game from "./game";
import { forEach } from "lodash";
import { useEffect, useState } from "react";
import { GameDetails } from "@/types/game";

export default function Ticker() {
  const [currentGame, setCurrentGame] = useState<number>(0);
  const gamesQuery = useSchedule();

  if (gamesQuery.isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  let games: GameDetails[] = gamesQuery?.data ?? [];

  useEffect(() => {
    for (let game of games) {
      if (game.home_team_score === null) {
        setCurrentGame(game.game_id-219);
      } 
      else {
        setCurrentGame(49);
      }
    }
}, [gamesQuery])

  return (
    <Carousel currentGame={currentGame}>
      {gamesQuery?.data?.map((game, index) => {
        return <Game game={game} key={index} />;
      })}
    </Carousel>
  );
}
