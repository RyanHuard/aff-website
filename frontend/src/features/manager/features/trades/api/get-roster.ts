import { api } from "@/lib/api";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { PlayerDetail } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export function getRoster(teamId?: string): Promise<PlayerDetail[]> | null {
  if (teamId == undefined) {
    return null;
  }
  return api
    .get(`/teams/rosters?team-id=${teamId}&season-id=${CURRENT_SEASON_ID}`)
    .then((res) => res.data);
}

export const useRoster = (teamId?: string) => {
  return useQuery({
    queryKey: ["roster", teamId],
    queryFn: () => getRoster(teamId),
  });
};
