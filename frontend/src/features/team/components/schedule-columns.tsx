import { Link } from "react-router-dom";

export const getColumns = (teamId) => {
  return [
    {
      name: "Week",
      selector: (row: any, index) => index + 1,
      width: "6rem",
    },
    {
      name: "Opponent",
      selector: (row: any) => row.opponent,
      width: "12rem",
      cell: (row: any) => {
        const isHome = row.home_team_id === teamId;

        let opponent, helmet, location;
        if (!isHome) {
          opponent = row.home_team_name;
          helmet = row.home_team_helmet;
          location = "@";
        } else {
          opponent = row.away_team_name;
          helmet = row.away_team_helmet;
          location = "vs";
        }

        return (
          <div className="flex">
            <span className="pr-[6px]">{location}</span>
            <img width="20" src={`/helmets/${helmet}`} />
            <Link className="pl-1 text-[#0066CC]" to={`/game/${row.game_id}`}>
              {opponent}
            </Link>
          </div>
        );
      },
    },
    {
      name: "Result",
      selector: (row: any) => row.result,
      cell: (row: any) => {
        const isComplete = row.away_team_score != null;

        const isHome = row.home_team_id === teamId;
        const homeWinner =
          row.home_team_score > row.away_team_score ? true : false;
        let isWinner;

        if ((homeWinner && isHome) || (!homeWinner && !isHome)) {
          isWinner = true;
        } else {
          isWinner = false;
        }

        return (
          <div>
            {isComplete && (
              <div>
                {isWinner ? (
                  <span className="font-bold text-green-600">W</span>
                ) : (
                  <span className="font-bold text-red-600">L</span>
                )}{" "}
                <Link className="text-[#0066CC]" to={`/game/${row.game_id}`}>
                  {row.away_team_score}-{row.home_team_score}
                </Link>
              </div>
            )}
          </div>
        );
      },
    },
  ];
};

export default getColumns;
