import { api } from "@/lib/api";
import { TeamDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getTeams(): Promise<TeamDetails[]> {
  return api.get(`/teams`).then((res) => res.data);
}

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  });
};
