import { api } from "@/lib/api";
import { PlayerStats } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export function getPlayerStats(firstName: string, lastName: string) {
  console.log(firstName, lastName);
  return api
    .get(`/player-stats?first-name=${firstName}&last-name=${lastName}`)
    .then((res) => res.data);
}

export const usePlayerStats = (firstName: string, lastName: string) => {
  return useQuery({
    queryKey: ["player-stats", [firstName, lastName]],
    queryFn: () => getPlayerStats(firstName, lastName),
  });
};
