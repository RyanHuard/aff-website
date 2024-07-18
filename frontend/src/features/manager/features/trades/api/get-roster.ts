import { api } from "@/lib/api";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { TeamDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getRoster(teamId: string): Promise<TeamDetails[]> {
  return api
    .get(`/teams/rosters?team-id=${teamId}&season-id=${CURRENT_SEASON_ID}`)
    .then((res) => res.data);
}

export const useRoster = (teamId: string) => {
  return useQuery({
    queryKey: ["roster", teamId],
    queryFn: () => getRoster(teamId),
  });
};
