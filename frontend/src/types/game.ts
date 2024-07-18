import { StringToBoolean } from "class-variance-authority/dist/types";

export type GameDetails = {
  game_id: number;
  season_id: number;
  away_team_id: number;
  home_team_id: number;
  away_team_score: number;
  home_team_score: number;
  away_team: TeamDetails;
  home_team: TeamDetails;
};

export type TeamDetails = {
  name: string;
  location: string;
  logo: string;
  team_logo?: string;
  abbreviation: string;
  current_season?: TeamStandings;
  team_id: string;
  primary_color?: string;
  secondary_color?: string;
};

export type TeamStandings = {
  wins: number;
  loss: number;
  points_for: number;
  points_against: number;
};
