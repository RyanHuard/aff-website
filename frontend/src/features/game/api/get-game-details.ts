import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getGameDetails = (gameId: string) => {
  return api.get(`/games/details/${gameId}`).then((res) => res.data);
};

export const useGameDetails = (gameId: string) => {
  return useQuery({
    queryKey: ["game-details", gameId],
    queryFn: () => getGameDetails(gameId),
  });
};
