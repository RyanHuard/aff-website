import { api } from "@/lib/api";
import { TeamDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getTeam(teamId: string): Promise<TeamDetails[]> {
  return api.get(`/teams?team-id=${teamId}`).then((res) => res.data);
}

export const useTeam = (teamId: string) => {
  return useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeam(teamId),
  });
};
