import { PlayerStats } from "@/types/player";

export const boxScoreCategories = {
  passing: {
    title: "Passing",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "C/ATT",
        getValue: (player: PlayerStats) =>
          `${player.match_pass_completions}/${player.match_pass_attempts}`,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_pass_yards,
      },
      {
        label: "TD",
        getValue: (player: PlayerStats) => player.match_pass_tds,
      },
      {
        label: "INT",
        getValue: (player: PlayerStats) => player.match_pass_ints,
      },
      {
        label: "SACKS",
        getValue: (player: PlayerStats) => player.match_pass_sacks,
      },
    ],
  },
  rushing: {
    title: "Rushing",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "CAR",
        getValue: (player: PlayerStats) => player.match_rush_attempts,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_rush_yards,
      },
      {
        label: "AVG",
        getValue: (player: PlayerStats) =>
          (player.match_rush_yards / player.match_rush_attempts).toFixed(1),
      },
      {
        label: "TD",
        getValue: (player: PlayerStats) => player.match_rush_tds,
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_rush_long,
      },
    ],
  },
  receiving: {
    title: "Receiving",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "REC",
        getValue: (player: PlayerStats) => player.match_receiving_receptions,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_receiving_yards,
      },
      {
        label: "AVG",
        getValue: (player: PlayerStats) =>
          (
            player.match_receiving_yards / player.match_receiving_receptions
          ).toFixed(1),
      },
      {
        label: "TD",
        getValue: (player: PlayerStats) => player.match_receiving_tds,
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_receiving_long,
      },
      {
        label: "TGTS",
        getValue: (player: PlayerStats) => player.match_receiving_targets,
      },
    ],
  },
  defense: {
    title: "Defense",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "T",
        getValue: (player: PlayerStats) => player.match_defense_tackles,
      },
      {
        label: "TFL",
        getValue: (player: PlayerStats) =>
          player.match_defense_tackles_for_loss,
      },
      {
        label: "SACKS",
        getValue: (player: PlayerStats) => player.match_defense_sacks,
      },
      {
        label: "INT",
        getValue: (player: PlayerStats) => player.match_defense_int,
      },
      {
        label: "DFL",
        getValue: (player: PlayerStats) => player.match_defense_deflections,
      },
    ],
  },
  kicking: {
    title: "Kicking",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "FG",
        getValue: (player: PlayerStats) =>
          player.match_kick_fg_made + "/" + player.match_kick_fg_attempts,
      },
      {
        label: "PCT",
        getValue: (player: PlayerStats) =>
          (
            (player.match_kick_fg_made / player.match_kick_fg_attempts) *
            100
          ).toFixed(1),
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_kick_fg_long,
      },
      {
        label: "XP",
        getValue: (player: PlayerStats) =>
          player.match_kick_xp_made + "/" + player.match_kick_xp_attempts,
      },
    ],
  },
  punting: {
    title: "Punting",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "PUNTS",
        getValue: (player: PlayerStats) => player.match_punt_count,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_punt_net_yards,
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_punt_long,
      },
      {
        label: "TB",
        getValue: (player: PlayerStats) => player.match_punt_touchbacks,
      },
    ],
  },
  kick_returning: {
    title: "Kick Returns",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "COUNT",
        getValue: (player: PlayerStats) => player.match_kick_return_count,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_kick_return_yards,
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_kick_return_long,
      },
      {
        label: "TD",
        getValue: (player: PlayerStats) => player.match_kick_return_tds,
      },
    ],
  },
  punt_returning: {
    title: "Punt Returns",
    stats: [
      {
        label: "Name",
        getValue: (player: PlayerStats) =>
          `${player.first_name} ${player.last_name}`,
      },
      {
        label: "COUNT",
        getValue: (player: PlayerStats) => player.match_punt_return_count,
      },
      {
        label: "YDS",
        getValue: (player: PlayerStats) => player.match_punt_return_yards,
      },
      {
        label: "LONG",
        getValue: (player: PlayerStats) => player.match_punt_return_long,
      },
      {
        label: "TD",
        getValue: (player: PlayerStats) => player.match_punt_return_tds,
      },
    ],
  },
};
