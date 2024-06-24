import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getGameStats(gameId: string) {
  return api.get(`/games/stats/${gameId}`).then((res) => res.data);
}

export const useGameStats = (gameId: string) => {
  return useQuery({
    queryKey: ["game-stats", gameId],
    queryFn: () => getGameStats(gameId),
  });
};
