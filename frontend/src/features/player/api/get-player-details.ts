import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getPlayerDetails = (firstName: string, lastName: string) => {
  return api.get(`/players/${firstName}/${lastName}`).then((res) => res.data);
};

export const usePlayerDetails = (firstName: string, lastName: string) => {
  return useQuery({
    queryKey: ["player-details", firstName, lastName],
    queryFn: () => getPlayerDetails(firstName, lastName),
  });
};
