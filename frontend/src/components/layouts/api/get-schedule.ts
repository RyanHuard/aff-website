import { api } from "@/lib/api";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { GameDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getSchedule(): Promise<GameDetails[]> {
  return api
    .get(`/games/schedule/${CURRENT_SEASON_ID}`)
    .then((res) => res.data);
}

export function useSchedule() {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(),
  });
}
