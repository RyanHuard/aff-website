import { api } from "@/lib/api";
import { PlayerStats } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export function getPlayerStats(
  seasonId: string,
  teamCity: string
): Promise<Record<string, PlayerStats[]>> {
  return api
    .get(`/player-stats/${seasonId}?team-city=${teamCity}`)
    .then((res) => res.data);
}

export const usePlayerStats = (seasonId: string, teamCity: string) => {
  return useQuery({
    queryKey: ["player-stats", seasonId, teamCity],
    queryFn: () => getPlayerStats(seasonId, teamCity),
  });
};
