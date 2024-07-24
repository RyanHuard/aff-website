import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function createTradeOffer(data) {
  return api.post("/trades", data);
}

export function useCreateTradeOffer() {
  return useMutation({
    mutationFn: createTradeOffer,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
}
