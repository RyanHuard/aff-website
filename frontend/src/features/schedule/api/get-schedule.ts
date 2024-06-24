import { api } from "@/lib/api";
import { GameDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getSchedule(seasonId: string): Promise<GameDetails[]> {
  return api.get(`/games/schedule/${seasonId}`).then((res) => res.data);
}

export function useSchedule(seasonId: string) {
  return useQuery({
    queryKey: ["schedule", seasonId],
    queryFn: () => getSchedule(seasonId),
  });
}
