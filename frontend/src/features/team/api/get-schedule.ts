import { api } from "@/lib/api";
import { GameDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getSchedule(
  seasonId: string,
  teamId: string
): Promise<GameDetails[]> {
  return api
    .get(`/games/schedule/${seasonId}?team-id=${teamId}`)
    .then((res) => res.data);
}

export const useSchedule = (seasonId: string, teamId: string) => {
  return useQuery({
    queryKey: ["schedule", seasonId, teamId],
    queryFn: () => getSchedule(seasonId, teamId),
  });
};
