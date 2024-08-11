import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const getFreeAgents = () => {
  return api.get(`/free-agency`).then((res) => res.data);
};

export const useFreeAgents = (currentPlayerIndex) => {
  return useQuery({
    queryKey: ["free_agents", currentPlayerIndex],
    queryFn: () => getFreeAgents(),
  });
};