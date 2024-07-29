export type TradeResponse = {
  trade_id: number;
  response: "accepted" | "rejected" | "canceled";
};
