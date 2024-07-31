import { TeamDetails } from "./game";

export type TradeOffer = {
  trade_id: number;
  season_id?: number;
  status: "accepted" | "rejected" | "pending";
  details: TradeDetail[];
  sending_team_id: number;
  sending_team_logo: string;
  sending_team_location: string;
  sending_team_name: string;
  sending_team_abbreviation: string;
  receiving_team_id: number;
  receiving_team_logo: string;
  receiving_team_location: string;
  receiving_team_name: string;
  receiving_team_abbreviation: string;
  date_created?: Date;
  date_responded?: Date;
};

export type CreateTradeOffer = {
  sending_team_id: number;
  receiving_team_id: number;
  season_id: number;
  trade_details: (PlayerDetail | DraftPickDetail)[];
};

export type TradeDetail = {
  direction: "to_receiving_team" | "to_sending_team";
  item_type: "player" | "draft_pick";
  first_name?: string;
  last_name?: string;
  draft_pick_id?: number;
  draft_pick_details?: DraftPickDetail;
};

export type DraftPickDetail = {
  pick_num?: number;
  round_num: number;
  season_id: number;
  draft_pick_id: number;
  team_id: number;
};

export type PlayerDetail = {
  team_details?: TeamDetails;
  pid: number;
  tid: number;
  fname: string;
  lname: string;
  age: number;
  height: number;
  weight: number;
  position: string;
  number: number;
  depth: number;
  captain: boolean;
  skill: number;
  speed: number;
  agility: number;
  strength: number;
  stamina: number;
  injury: boolean;
  contract: string;
  salary: number;
  yrs: number;
  morale: number;
  pers_leadership: number;
  pers_loyalty: number;
  pers_winner: number;
  pers_greed: number;
  pers_iq: number;
  pers_work_ethic: number;
  popularity: number;
  helmet: string;
  visor: string;
  visor_color: string;
  earring: string;
  earring_color: string;
  hat: string;
  hat_color1: string;
  hat_color2: string;
  hat_color3: string;
  hat_color: string;
  glove: string;
  glove_color: string;
  hair: string;
  hair_color: string;
  face: string;
  facial_hair: string;
  facial_hair_color: string;
  eye_color: string;
  eyebrow: string;
  eyebrow_color: string;
  skin_color: string;
  skin_color_section: string;
  injury_type: string;
  injury_week: number;
  college: string;
  season_id: number;
};
