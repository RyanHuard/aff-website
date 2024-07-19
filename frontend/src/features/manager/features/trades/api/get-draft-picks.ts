import { api } from "@/lib/api";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import { DraftPickDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function getDraftPicks(
  teamId?: string
): Promise<DraftPickDetail[]> | null {
  if (teamId == undefined) {
    return null;
  }
  return api
    .get(`/teams/draft-picks?team-id=${teamId}&season-id=${CURRENT_SEASON_ID}`)
    .then((res) => res.data);
}

export const useDraftPicks = (teamId?: string) => {
  return useQuery({
    queryKey: ["draft-picks", teamId],
    queryFn: () => getDraftPicks(teamId),
  });
};
