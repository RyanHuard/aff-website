import BoxScoreCategory from "./box-score-category";
import { GameDetails } from "@/types/game";
import { boxScoreCategories } from "./box-score-categories";

type BoxScoreProps = {
  boxScore: any;
  game: GameDetails;
};

const BoxScore = ({ boxScore, game }: BoxScoreProps) => {
  if (game?.season_id < 4) {
    return (
      <div className="mx-auto h-[500px] max-w-4xl rounded bg-white drop-shadow">
        <h1 className="p-6 text-center">
          Sorry, there are no game stats available until 2025.
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto hidden max-w-fit rounded-sm bg-white pb-6 pt-2 drop-shadow lg:block">
        {Object.entries(boxScoreCategories).map(
          ([position, category], index) => {
            return (
              <div className="flex h-full px-4">
                <BoxScoreCategory
                  title={category.title}
                  position={position}
                  playerStats={boxScore?.away_team_stats[position]}
                  stats={category.stats}
                  teamName={game?.away_team?.name}
                  teamLogo={game?.away_team?.logo}
                  key={index}
                />
                <div className="ml-4 border-l border-neutral-300 pl-4">
                  <BoxScoreCategory
                    title={category.title}
                    position={position}
                    playerStats={boxScore?.home_team_stats[position]}
                    stats={category.stats}
                    teamName={game?.home_team?.name}
                    teamLogo={game?.home_team?.logo}
                    key={index}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Mobile */}
      <div className="block max-w-fit rounded-sm bg-white pb-6 pt-6 drop-shadow lg:hidden">
        {Object.entries(boxScoreCategories).map(
          ([position, category], index) => {
            return (
              <div className="flex h-full px-4">
                <BoxScoreCategory
                  title={category["title"]}
                  position={position}
                  stats={category["stats"]}
                  playerStats={boxScore?.away_team_stats[position]}
                  teamName={game?.away_team?.name}
                  teamLogo={game?.away_team?.logo}
                  key={index}
                />
              </div>
            );
          }
        )}

        {/*Border */}
        <div id="border" className="mt-4 h-px w-full bg-neutral-300" />

        {Object.entries(boxScoreCategories).map(
          ([position, category], index) => {
            return (
              <div className="flex h-full px-4">
                <BoxScoreCategory
                  title={category["title"]}
                  position={position}
                  stats={category["stats"]}
                  playerStats={boxScore?.home_team_stats[position]}
                  teamName={game?.home_team?.name}
                  teamLogo={game?.home_team?.logo}
                  key={index}
                />
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default BoxScore;
