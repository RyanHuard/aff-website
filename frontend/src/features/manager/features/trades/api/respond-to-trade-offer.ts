import { api } from "@/lib/api";
import { TradeResponse } from "@/types/trades";
import { useMutation } from "@tanstack/react-query";

export function respondToTradeOffer(data: TradeResponse) {
  return api.patch("/trades/respond", data);
}

export function useRespondToTradeOffer() {
  return useMutation({
    mutationFn: respondToTradeOffer,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });
}
