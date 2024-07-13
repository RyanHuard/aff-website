import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getTrades(): Promise<TradeOffer[]> {
  return api.get(`/trades`).then((res) => res.data);
}

export const useTrades = () => {
  return useQuery({
    queryKey: ["trades"],
    queryFn: () => getTrades(),
  });
};
