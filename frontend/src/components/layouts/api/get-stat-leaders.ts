import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function getStatLeadersWeekly() {
    return api.get("/home/stats/weekly");
}

export function useStatLeadersWeekly() {
    return useQuery({
        queryKey: ["stat-leaders-weekly"],
        queryFn: getStatLeadersWeekly
    })
}

