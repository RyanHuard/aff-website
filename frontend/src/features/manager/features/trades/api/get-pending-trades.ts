import { api, setAuthToken } from "@/lib/api";
import { TradeOffer } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function getPendingTrades(
  teamId: string,
  token: string
): Promise<TradeOffer[]> {
  setAuthToken(token);

  return api
    .get(`/trades?status=pending&team-id=${teamId}`)
    .then((res) => res.data);
}

export const usePendingTrades = (teamId: string, token: string) => {
  return useQuery({
    queryKey: ["pendingTrades", teamId],
    queryFn: () => getPendingTrades(teamId, token),
  });
};
