import React from "react";
import { Link } from "react-router-dom";

export default function Game({ ...game }) {
  return (
    <Link to={`/game/${game.game_id}`}>
      <div className="lg:mx-0 mb-4 flex h-14 items-center justify-center rounded-sm bg-white drop-shadow">
        <div className="flex  w-64 items-center justify-end">
          <span className="hidden px-1 sm:block">
            ({game?.away_team?.current_season?.wins}-
            {game?.away_team?.current_season?.loss})
          </span>
          <span className="hidden px-1 text-lg sm:block">
            {game?.away_team?.name}
          </span>
          <div className="flex-col-reverse flex text-center mt-2">
            <span className="text-md px-2 sm:hidden">
              {game?.away_team?.abbreviation}
            </span>
            <img
              className="mx-3 w-7 sm:w-11"
              src={`/helmets/${game?.away_team?.helmet}`}
            />
          </div>
          <span
            className={`${
              game?.away_team_score == null && "hidden"
            } w-10 px-2 text-center text-lg font-bold sm:text-xl`}
          >
            {game?.away_team_score}
          </span>
        </div>

        <div className="px-4 text-2xl ">@</div>

        <div className="flex  w-64 flex-row-reverse items-center justify-end">
          <span className="hidden px-1 sm:block">
            ({game?.home_team?.current_season.wins}-
            {game?.home_team?.current_season.loss})
          </span>
          <span className="hidden px-1 text-lg sm:block">
            {game?.home_team?.name}
          </span>
          <div className="flex-col-reverse flex text-center mt-2">
            <span className="text-md px-2 sm:hidden">
              {game?.home_team?.abbreviation}
            </span>
            <img
              className="mx-3 w-7 sm:w-11"
              src={`/helmets/${game?.home_team?.helmet}`}
            />
          </div>
          <span
            className={`${
              game?.away_team_score == null && "hidden"
            } w-10 text-center text-lg font-bold sm:text-xl`}
          >
            {game.home_team_score}
          </span>
        </div>
      </div>
    </Link>
  );
}
