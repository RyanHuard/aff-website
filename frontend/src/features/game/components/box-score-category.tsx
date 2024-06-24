import { PlayerStats } from "@/types/player";

type BoxScoreCategoryProps = {
  title: string;
  position: string;
  playerStats: PlayerStats[];
  stats: any;
  teamName: string;
  teamLogo: string;
};

const BoxScoreCategory = ({
  title,
  position,
  playerStats,
  stats, // Selected stats
  teamName,
  teamLogo,
}: BoxScoreCategoryProps) => {
  switch (position) {
    case "passing":
      playerStats?.sort((a, b) => b.match_pass_yards - a.match_pass_yards);
      break;
    case "rushing":
      playerStats?.sort((a, b) => b.match_rush_yards - a.match_rush_yards);
      break;
    case "receiving":
      playerStats?.sort(
        (a, b) => b.match_receiving_yards - a.match_receiving_yards
      );
      break;
    case "defense":
      playerStats?.sort(
        (a, b) => b.match_defense_tackles - a.match_defense_tackles
      );
      break;
  }
  console.log(stats);

  return (
    <div className="pt-6 text-black">
      <div className="mx-1 flex text-left text-sm font-semibold pb-1">
        <h2 className="flex text-black text-[13px] ">
          <img className="mr-1" width="20" src={`/logos/${teamLogo}`} />
          {teamName} {title}
        </h2>
      </div>
      <table className="lg:w-[415px] w-full mb-3 table-fixed border-collapse border-b border-neutral-300">
        <thead>
          <tr>
            {stats.map((stat: any, index: number) => (
              <th
                className="border-y border-neutral-300 px-1 py-1 text-right text-xs font-bold first:w-[30%] first:border-r"
                key={index}
              >
                {stat.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerStats?.map((player, playerIndex) => (
            <tr className="even:bg-[#f8f8f8]" key={playerIndex}>
              {stats.map((stat: any, statIndex: number) => (
                <td
                  className="border-neutral-300 px-1 py-1 text-right text-[13px] first:border-r first:text-left"
                  key={statIndex}
                >
                  {stat.getValue(player)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoxScoreCategory;
