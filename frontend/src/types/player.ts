import { TeamDetails } from "./game";

type StatCategory = "match" | "season";

export type PlayerStats = {
  depthchart: number;
  fantasy_points: number;
  first_name: string;
  game_id: number;
  team: TeamDetails;
  injury_recovery_weeks_remaining: number;
  last_name: string;
  games_played?: number;
  number: number;
  pid: number;
  position: string;
  season_id: number;
  team_city: string;
} & {
  [K in
    | `${StatCategory}_defense_deflections`
    | `${StatCategory}_defense_int`
    | `${StatCategory}_defense_int_tds`
    | `${StatCategory}_defense_int_yards`
    | `${StatCategory}_defense_int_yards_long`
    | `${StatCategory}_defense_sacks`
    | `${StatCategory}_defense_tackles`
    | `${StatCategory}_defense_tackles_for_loss`
    | `${StatCategory}_fumble`
    | `${StatCategory}_fumble_forced`
    | `${StatCategory}_fumble_recovered`
    | `${StatCategory}_fumble_recovered_tds`
    | `${StatCategory}_fumble_recovered_yards`
    | `${StatCategory}_kick_count`
    | `${StatCategory}_kick_fg_attempts`
    | `${StatCategory}_kick_fg_long`
    | `${StatCategory}_kick_fg_made`
    | `${StatCategory}_kick_return_count`
    | `${StatCategory}_kick_return_long`
    | `${StatCategory}_kick_return_tds`
    | `${StatCategory}_kick_return_yards`
    | `${StatCategory}_kick_touchbacks`
    | `${StatCategory}_kick_xp_attempts`
    | `${StatCategory}_kick_xp_made`
    | `${StatCategory}_pass_attempts`
    | `${StatCategory}_pass_completions`
    | `${StatCategory}_pass_ints`
    | `${StatCategory}_pass_long`
    | `${StatCategory}_pass_sacks`
    | `${StatCategory}_pass_tds`
    | `${StatCategory}_pass_yards`
    | `${StatCategory}_punt_count`
    | `${StatCategory}_punt_gross_yards`
    | `${StatCategory}_punt_long`
    | `${StatCategory}_punt_net_yards`
    | `${StatCategory}_punt_return_count`
    | `${StatCategory}_punt_return_long`
    | `${StatCategory}_punt_return_tds`
    | `${StatCategory}_punt_return_yards`
    | `${StatCategory}_punt_touchbacks`
    | `${StatCategory}_receiving_drops`
    | `${StatCategory}_receiving_long`
    | `${StatCategory}_receiving_receptions`
    | `${StatCategory}_receiving_targets`
    | `${StatCategory}_receiving_tds`
    | `${StatCategory}_receiving_yards`
    | `${StatCategory}_rush_attempts`
    | `${StatCategory}_rush_long`
    | `${StatCategory}_rush_tds`
    | `${StatCategory}_rush_yards`
    | `${StatCategory}_safeties`
    | `${StatCategory}_time_of_possession`
    | `${StatCategory}_two_point_conversion_plays`
    | `${StatCategory}_two_point_conversions`]: number;
};
