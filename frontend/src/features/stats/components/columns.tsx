import { Link } from "react-router-dom";

export const columns = [
  /* Passing */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
        (row.season_pass_completions / row.season_pass_attempts).toFixed(1),
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
        return (
          <Link
            to={`/players/${row.first_name
              .toLowerCase()
              .replace(" ", "-")}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
  /* Kicking */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
      name: "FG Made",
      selector: (row: PlayerStats) => row.season_kick_fg_made,
      sortable: true,
    },
    {
      name: "FG Att",
      selector: (row: PlayerStats) => row.season_kick_fg_attempts,
      sortable: true,
    },
    {
      name: "FG %",
      selector: (row: PlayerStats) =>
        (row.season_kick_fg_made / row.season_kick_fg_attempts) * 100,
      sortable: true,
      cell: (row: PlayerStats) => (
        <div>
          {(
            (row.season_kick_fg_made / row.season_kick_fg_attempts) *
            100
          ).toFixed(1)}
        </div>
      ),
    },
    {
      name: "FG Long",
      selector: (row: PlayerStats) => row.season_kick_fg_long,
      sortable: true,
    },
    {
      name: "XP Made",
      selector: (row: PlayerStats) => row.season_kick_xp_made,
      sortable: true,
    },
    {
      name: "XP Att",
      selector: (row: PlayerStats) => row.season_kick_xp_attempts,
      sortable: true,
    },
    {
      name: "FG %",
      selector: (row: PlayerStats) =>
        (row.season_kick_xp_made / row.season_kick_xp_attempts) * 100,
      sortable: true,
      cell: (row: PlayerStats) => (
        <div>
          {(
            (row.season_kick_xp_made / row.season_kick_xp_attempts) *
            100
          ).toFixed(1)}
        </div>
      ),
    },
  ],
  /* Punting */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
      name: "Gross Avg",
      selector: (row: PlayerStats) =>
        (row.season_punt_gross_yards / row.season_punt_count).toFixed(1),
      sortable: true,
    },
    {
      name: "Net Avg",
      selector: (row: PlayerStats) =>
        (row.season_punt_net_yards / row.season_punt_count).toFixed(1),
      sortable: true,
    },
    {
      name: "Net Yds",
      selector: (row: PlayerStats) => row.season_punt_net_yards,
      sortable: true,
    },
    {
      name: "Punts",
      selector: (row: PlayerStats) => row.season_punt_count,
      sortable: true,
    },
    {
      name: "Long",
      selector: (row: PlayerStats) => row.season_punt_long,
      sortable: true,
    },
    {
      name: "Gross Yds",
      selector: (row: PlayerStats) => row.season_punt_gross_yards,
      sortable: true,
    },
    {
      name: "Touchbacks",
      selector: (row: PlayerStats) => row.season_punt_touchbacks,
      sortable: true,
    },
  ],

  /* Kickoff Returns */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
      name: "K Avg",
      selector: (row: PlayerStats) => {
        const yardsPerAttempt =
          row.season_kick_return_yards / row.season_kick_return_count;
        return Math.round(yardsPerAttempt * 10) / 10; // Round to 1 decimal place
      },
      sortable: true,
    },
    {
      name: "K Ret",
      selector: (row: PlayerStats) => row.season_kick_return_count,
      sortable: true,
    },
    {
      name: "K Yds",
      selector: (row: PlayerStats) => row.season_kick_return_yards,
      sortable: true,
    },
    {
      name: "K TD",
      selector: (row: PlayerStats) => row.season_kick_return_tds,
      sortable: true,
    },
    {
      name: "K Long",
      selector: (row: PlayerStats) => row.season_kick_return_long,
      sortable: true,
    },
  ],

  /* Punt Returns */ [
    {
      name: "Player",
      selector: (row: PlayerStats) => `${row.first_name} ${row.last_name}`,
      sortable: true,
      cell: (row: PlayerStats) => {
        return (
          <Link
            to={`/players/${row.first_name.toLowerCase()}-${row.last_name.toLowerCase()}`}
          >
            <div className="flex">
              <img src={`/logos/${row.team.logo}`} alt="Logo" width={30} />
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
      name: "P Avg",
      selector: (row: PlayerStats) => {
        const yardsPerAttempt =
          row.season_punt_return_yards / row.season_punt_return_count;
        return Math.round(yardsPerAttempt * 10) / 10; // Round to 1 decimal place
      },
      sortable: true,
    },
    {
      name: "P Ret",
      selector: (row: PlayerStats) => row.season_punt_return_count,
      sortable: true,
    },
    {
      name: "P Yds",
      selector: (row: PlayerStats) => row.season_punt_return_yards,
      sortable: true,
    },
    {
      name: "P TD",
      selector: (row: PlayerStats) => row.season_punt_return_tds,
      sortable: true,
    },
    {
      name: "P Long",
      selector: (row: PlayerStats) => row.season_punt_return_long,
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
