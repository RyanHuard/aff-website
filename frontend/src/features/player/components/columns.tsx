export const columns = [
  /* Passing */ [
    {
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
    },
    {
      name: "Pass Yds",
      selector: (row: any) => row.season_pass_yards,
      sortable: true,
    },
    {
      name: "Yds/Att",
      selector: (row: any) => {
        const yardsPerAttempt =
          row.season_pass_yards / row.season_pass_attempts;
        return Math.round(yardsPerAttempt * 10) / 10; // Round to 1 decimal place
      },
      sortable: true,
    },
    {
      name: "Att",
      selector: (row: any) => row.season_pass_attempts,
      sortable: true,
    },
    {
      name: "Comp",
      selector: (row: any) => row.season_pass_completions,
      sortable: true,
    },
    {
      name: "Comp %",
      selector: (row: any) =>
        (row.season_pass_completions / row.season_pass_attempts).toFixed(1),
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: any) => row.season_pass_tds,
      sortable: true,
    },
    {
      name: "Int",
      selector: (row: any) => row.season_pass_ints,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row: any) =>
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
      selector: (row: any) => row.season_pass_sacks,
      sortable: true,
    },
  ],
  /* Rushing */ [
    {
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
    },
    {
      name: "Rush Yds",
      selector: (row: any) => row.season_rush_yards,
      sortable: true,
    },
    {
      name: "Yds/Carry",
      selector: (row: any) => row.season_rush_yards / row.season_rush_attempts,
      sortable: true,
      cell: (row: any) => (
        <div>
          {(row.season_rush_yards / row.season_rush_attempts).toFixed(1)}
        </div>
      ),
    },
    {
      name: "Carries",
      selector: (row: any) => row.season_rush_attempts,
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: any) => row.season_rush_tds,
      sortable: true,
    },
    {
      name: "Long",
      selector: (row: any) => row.season_rush_long,
      sortable: true,
    },
    {
      name: "Fumbles",
      selector: (row: any) => row.season_fumble,
      sortable: true,
    },
  ],
  /* Receiving */ [
    {
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
    },
    {
      name: "Rec Yds",
      selector: (row: any) => row.season_receiving_yards,
      sortable: true,
    },
    {
      name: "Rec",
      selector: (row: any) => row.season_receiving_receptions,
      sortable: true,
    },
    {
      name: "Yds/Rec",
      selector: (row: any) =>
        row.season_receiving_yards / row.season_receiving_receptions,
      sortable: true,
      cell: (row: any) => (
        <div>
          {(
            row.season_receiving_yards / row.season_receiving_receptions
          ).toFixed(1)}
        </div>
      ),
    },
    {
      name: "Yds/G",
      selector: (row: any) =>
        Math.round((row.season_receiving_yards / row.games_played!) * 10) / 10,
      sortable: true,
    },
    {
      name: "TD",
      selector: (row: any) => row.season_receiving_tds,
      sortable: true,
    },
    {
      name: "Targets",
      selector: (row: any) => row.season_receiving_targets,
      sortable: true,
    },
  ],
  /* Defense */ [
    {
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
    },
    {
      name: "Tackles",
      selector: (row: any) => row.season_defense_tackles,
      sortable: true,
    },
    {
      name: "Sacks",
      selector: (row: any) => row.season_defense_sacks,
      sortable: true,
    },
    {
      name: "Int",
      selector: (row: any) => row.season_defense_int,
      sortable: true,
    },
    {
      name: "Int Yds",
      selector: (row: any) => row.season_defense_int_yards,
      sortable: true,
    },
    {
      name: "TFL",
      selector: (row: any) => row.season_defense_tackles_for_loss,
      sortable: true,
    },
    {
      name: "Deflections",
      selector: (row: any) => row.season_defense_deflections,
      sortable: true,
    },
  ],
  /* Kicking */ [
    {
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
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
      name: "XP %",
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
      name: "Season",
      selector: (row: any) => parseInt(row.season_id) + 2021,
      sortable: true,
      maxwidth: "2rem",
    },
    {
      name: "Team",
      selector: (row: any) => row.team,
      cell: (row: any) => {
        return (
          <div className="flex">
            <img className="w-5 mr-1" src={`/logos/${row.team.logo}`} />
            <span className="my-auto">{row.team.abbreviation}</span>
          </div>
        );
      },
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
];

import { PlayerStats } from "@/types/player";
import { clamp, round } from "lodash";

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
