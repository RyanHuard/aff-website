import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getRecentTrades(): Promise<TradeOffer[]> {
  return api.get(`/trades?status=accepted&limit=5`).then((res) => res.data);
}

export const useRecentTrades = () => {
  return useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getRecentTrades(),
  });
};
