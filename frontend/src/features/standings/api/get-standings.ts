import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getStandings = (season_id: string) => {
  return api.get(`/standings/${season_id}`).then((res) => res.data);
};

export const useStandings = (season_id: string) => {
  return useQuery({
    queryKey: ["standings", season_id],
    queryFn: () => getStandings(season_id),
  });
};
