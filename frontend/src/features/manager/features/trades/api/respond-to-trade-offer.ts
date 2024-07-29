import { api } from "@/lib/api";
import { TradeResponse } from "@/types/trades";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function respondToTradeOffer(data: TradeResponse) {
  return api.patch("/trades/respond", data);
}

export function useRespondToTradeOffer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: respondToTradeOffer,
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["pendingTrades"] });
    },
    onError: (error) => {
      toast.error("Trade response failed. Please try again.");
    },
  });
}
