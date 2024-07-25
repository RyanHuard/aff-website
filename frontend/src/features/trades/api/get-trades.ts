import { api } from "@/lib/api";
import { TradeOffer } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function getTrades(seasonId: string): Promise<TradeOffer[]> {
  return api
    .get(`/trades?status=accepted&season-id=${seasonId}`)
    .then((res) => res.data);
}

export const useTrades = (seasonId: string) => {
  return useQuery({
    queryKey: ["trades", seasonId],
    queryFn: () => getTrades(seasonId),
  });
};
