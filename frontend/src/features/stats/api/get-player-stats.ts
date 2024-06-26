import { api } from "@/lib/api";
import { PlayerStats } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export function getPlayerStats(
  seasonId: string
): Promise<Record<string, PlayerStats[]>> {
  return api.get(`/player-stats?season-id=${seasonId}`).then((res) => res.data);
}

export const usePlayerStats = (seasonId: string) => {
  return useQuery({
    queryKey: ["player-stats", seasonId],
    queryFn: () => getPlayerStats(seasonId),
  });
};
