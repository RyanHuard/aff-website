import { api } from "@/lib/api";
import { PlayerStats } from "@/types/player";
import { useQuery } from "@tanstack/react-query";


export function getStatLeadersWeekly(): Promise<Record<string, PlayerStats[]>> {
    return api.get("/home/stats/weekly").then((res) => res.data);
}

export function useStatLeadersWeekly() {
    return useQuery({
        queryKey: ["stat-leaders-weekly"],
        queryFn: getStatLeadersWeekly
    })
}

