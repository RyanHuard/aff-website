import { api } from "@/lib/api";
import { TeamDetails } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export function getTeams(orderBy?: string): Promise<TeamDetails[]> {
  let options = "";
  if (orderBy) {
    options = `?order-by=${orderBy}`;
  }
  return api.get(`/teams${options}`).then((res) => res.data);
}

export const useTeams = (orderBy?: string) => {
  return useQuery({
    queryKey: ["teams", orderBy],
    queryFn: () => getTeams(orderBy),
  });
};
