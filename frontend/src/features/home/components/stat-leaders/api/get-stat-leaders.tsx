import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getStatLeaders(seasonId: string) {
  return api.get(`/player-stats/leaders/${seasonId}`).then((res) => res.data);
}

export const useStatLeaders = (seasonId: string) => {
  return useQuery({
    queryKey: ["player-stats", seasonId],
    queryFn: () => getStatLeaders(seasonId),
  });
};
