import React from "react";
import { Link } from "react-router-dom";

const calculateWeek = (gameId: number) => {
  let seasonStartGameId = 219;
  return Math.ceil((gameId + 1 - seasonStartGameId) / 5);
};

const Game = ({ game }: any) => {
  const awayLogo = `/logos/${game.away_team.logo}`;
  const homeLogo = `/logos/${game.home_team.logo}`;

  let awayResult;
  if (game.away_team_score > game.home_team_score) {
    awayResult = true;
  } else {
    awayResult = false;
  }

  return (
    <Link to={`/game/${game.game_id}`}>
      <div className="flex bg-slate-50">
        <div className="h-24 w-44 border-l border-neutral-300 py-3 pl-2">
          <span className="mb-1 flex">
            <img src={awayLogo} className="mr-1 w-6" alt="away team logo" />{" "}
            <span
              className={`my-auto w-10 text-[13px] font-bold ${
                awayResult ? "text-black" : "text-neutral-500"
              }`}
            >
              {game.away_team.abbreviation}
            </span>
            <span
              className={`my-auto ml-1 w-4 text-[13px] font-bold ${
                awayResult ? "text-black" : "text-neutral-500"
              }`}
            >
              {game.away_team_score}
            </span>
            <span className="my-auto ml-10 text-xs text-neutral-600">
              ({game.away_team.current_season.wins}-
              {game.away_team.current_season.loss})
            </span>
          </span>
          <span className="flex">
            <img src={homeLogo} className="mr-1 w-6" alt="home team logo" />{" "}
            <span
              className={`my-auto w-10 text-[13px] font-bold ${
                !awayResult ? "text-black" : "text-neutral-500"
              }`}
            >
              {game.home_team.abbreviation}
            </span>
            <span
              className={`my-auto ml-1 w-4 text-[13px] font-bold ${
                !awayResult ? "text-black" : "text-neutral-500"
              }`}
            >
              {game.home_team_score}
            </span>
            <span className="my-auto ml-10 text-xs text-neutral-600">
              ({game.home_team.current_season.wins}-
              {game.home_team.current_season.loss})
            </span>
          </span>
          <span className="ml-1 text-xs">
            Week {calculateWeek(game.game_id)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Game;
