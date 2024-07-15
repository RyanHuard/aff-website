type TradeOffer = {
  trade_id: number;
  season_id?: number;
  status: "accepted" | "rejected" | "pending";
  details: TradeDetail[];
  sending_team_id: number;
  sending_team_logo: string;
  sending_team_name: string;
  sending_team_abbreviation: string;;
  receiving_team_id: number;
  receiving_team_logo: string;
  receiving_team_name: string;
  receiving_team_abbreviation: string;
  date_created?: Date;
  date_responded?: Date;
};

type TradeDetail = {
  direction: "to_receiving_team" | "to_sending_team";
  item_type: "player" | "draft_pick";
  player_first_name?: string;
  player_last_name?: string;
  draft_pick_id?: number;
  draft_pick_details?: DraftPickDetail;
};

type DraftPickDetail = {
  pick_num?: number;
  round_num: number;
  season_id: number;
};
