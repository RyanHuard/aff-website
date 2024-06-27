import { Link } from "react-router-dom";

export const columns = [
  /* Passing */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        const playerName = `${row.first_name}_${row.last_name}`;
        const src = `/players/${playerName}.png`;
        const fallbackSrc = "/players/player_placeholder.png";

        return (
          <Link
            to={`/players/${row.first_name
              ?.toLowerCase()
              .replace(" ", "-")}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex text-[#0066CC]">
              <img
                src={src}
                onError={(e: any) => {
                  e.target.src = fallbackSrc;
                }}
                alt="Logo"
                width={26}
                className=""
              />
              <div className="my-auto pl-2">
                {row.first_name} {row.last_name}
                <span className="px-[6px]">·</span>
                <span className="text-neutral-500">{row.position}</span>
              </div>
            </div>
          </Link>
        );
      },
      width: "16rem",
    },
    {
      name: "Pass Yds",
      selector: (row: PlayerStats) => row.season_pass_yards,
      sortable: true,
    },
    {
      name: "Yds/Att",
      selector: (row: PlayerStats) => {
        const yardsPerAttempt =
          row.season_pass_yards / row.season_pass_attempts;
        return Math.round(yardsPerAttempt * 10) / 10; // Round to 1 decimal place
      },
      sortable: true,
    },
    {
      name: "Att",
      selector: (row: PlayerStats) => row.season_pass_attempts,
      sortable: true,
    },
    {
      name: "Comp",
      selector: (row: PlayerStats) => row.season_pass_completions,
      sortable: true,
    },
    {
      name: "Comp %",
      selector: (row: PlayerStats) =>
        (
          (row.season_pass_completions / row.season_pass_attempts) *
          100
        ).toFixed(1),
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: PlayerStats) => row.season_pass_tds,
      sortable: true,
    },
    {
      name: "Int",
      selector: (row: PlayerStats) => row.season_pass_ints,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row: PlayerStats) =>
        calculatePasserRating(
          row.season_pass_attempts,
          row.season_pass_completions,
          row.season_pass_tds,
          row.season_pass_ints,
          row.season_pass_yards
        ),
      sortable: true,
    },
    {
      name: "Sacks",
      selector: (row: PlayerStats) => row.season_pass_sacks,
      sortable: true,
    },
  ],
  /* Rushing */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        const playerName = `${row.first_name}_${row.last_name}`;
        const src = `/players/${playerName}.png`;
        const fallbackSrc = "/players/player_placeholder.png";

        return (
          <Link
            to={`/players/${row.first_name
              ?.toLowerCase()
              .replace(" ", "-")}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex text-[#0066CC]">
              <img
                src={src}
                onError={(e: any) => {
                  e.target.src = fallbackSrc;
                }}
                alt="Logo"
                width={26}
                className=""
              />
              <div className="my-auto pl-2">
                {row.first_name} {row.last_name}
                <span className="px-[6px]">·</span>
                <span className="text-neutral-500">{row.position}</span>
              </div>
            </div>
          </Link>
        );
      },
      width: "16rem",
    },
    {
      name: "Rush Yds",
      selector: (row: PlayerStats) => row.season_rush_yards,
      sortable: true,
    },
    {
      name: "Yds/Carry",
      selector: (row: PlayerStats) =>
        row.season_rush_yards / row.season_rush_attempts,
      sortable: true,
      cell: (row: PlayerStats) => (
        <div>
          {(row.season_rush_yards / row.season_rush_attempts).toFixed(1)}
        </div>
      ),
    },
    {
      name: "Carries",
      selector: (row: PlayerStats) => row.season_rush_attempts,
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: PlayerStats) => row.season_rush_tds,
      sortable: true,
    },
    {
      name: "Long",
      selector: (row: PlayerStats) => row.season_rush_long,
      sortable: true,
    },
    {
      name: "Fumbles",
      selector: (row: PlayerStats) => row.season_fumble,
      sortable: true,
    },
  ],
  /* Receiving */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        const playerName = `${row.first_name}_${row.last_name}`;
        const src = `/players/${playerName}.png`;
        const fallbackSrc = "/players/player_placeholder.png";

        return (
          <Link
            to={`/players/${row.first_name
              ?.toLowerCase()
              .replace(" ", "-")}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex text-[#0066CC]">
              <img
                src={src}
                onError={(e: any) => {
                  e.target.src = fallbackSrc;
                }}
                alt="Logo"
                width={26}
                className=""
              />
              <div className="my-auto pl-2">
                {row.first_name} {row.last_name}
                <span className="px-[6px]">·</span>
                <span className="text-neutral-500">{row.position}</span>
              </div>
            </div>
          </Link>
        );
      },
      width: "16rem",
    },
    {
      name: "Rec Yds",
      selector: (row: PlayerStats) => row.season_receiving_yards,
      sortable: true,
    },
    {
      name: "Rec",
      selector: (row: PlayerStats) => row.season_receiving_receptions,
      sortable: true,
    },
    {
      name: "Yds/Rec",
      selector: (row: PlayerStats) =>
        row.season_receiving_yards / row.season_receiving_receptions,
      sortable: true,
      cell: (row: PlayerStats) => (
        <div>
          {(
            row.season_receiving_yards / row.season_receiving_receptions
          ).toFixed(1)}
        </div>
      ),
    },
    {
      name: "Yds/G",
      selector: (row: PlayerStats) =>
        Math.round((row.season_receiving_yards / row.games_played!) * 10) / 10,
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: PlayerStats) => row.season_receiving_tds,
      sortable: true,
    },
    {
      name: "Targets",
      selector: (row: PlayerStats) => row.season_receiving_targets,
      sortable: true,
    },
  ],
  /* Defense */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        const playerName = `${row.first_name}_${row.last_name}`;
        const src = `/players/${playerName}.png`;
        const fallbackSrc = "/players/player_placeholder.png";

        return (
          <Link
            to={`/players/${row.first_name
              ?.toLowerCase()
              .replace(" ", "-")}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex text-[#0066CC]">
              <img
                src={src}
                onError={(e: any) => {
                  e.target.src = fallbackSrc;
                }}
                alt="Logo"
                width={26}
                className=""
              />
              <div className="my-auto pl-2">
                {row.first_name} {row.last_name}
                <span className="px-[6px]">·</span>
                <span className="text-neutral-500">{row.position}</span>
              </div>
            </div>
          </Link>
        );
      },
      width: "16rem",
    },
    {
      name: "Tackles",
      selector: (row: PlayerStats) => row.season_defense_tackles,
      sortable: true,
    },
    {
      name: "Sacks",
      selector: (row: PlayerStats) => row.season_defense_sacks,
      sortable: true,
    },
    {
      name: "Int",
      selector: (row: PlayerStats) => row.season_defense_int,
      sortable: true,
    },
    {
      name: "Int Yds",
      selector: (row: PlayerStats) => row.season_defense_int_yards,
      sortable: true,
    },
    {
      name: "TFL",
      selector: (row: PlayerStats) => row.season_defense_tackles_for_loss,
      sortable: true,
    },
    {
      name: "Deflections",
      selector: (row: PlayerStats) => row.season_defense_deflections,
      sortable: true,
    },
  ],
];

import { clamp, round } from "lodash";
import { PlayerStats } from "@/types/player";

// Calculates passer rating according to NFL formula
// https://en.wikipedia.org/wiki/Passer_rating#NFL_and_CFL_formula
// Dependencies required: lodash (clamp, round)
const calculatePasserRating = (
  attempts: number,
  completions: number,
  touchdowns: number,
  interceptions: number,
  yards: number
) => {
  if (attempts === 0) return 0;
  const a = clamp((completions / attempts - 0.3) * 5, 0, 2.375);
  const b = clamp((yards / attempts - 3) * 0.25, 0, 2.375);
  const c = clamp((touchdowns / attempts) * 20, 0, 2.375);
  const d = clamp(2.375 - (interceptions / attempts) * 25, 0, 2.375);

  return round(((a + b + c + d) / 6) * 100, 1);
};
