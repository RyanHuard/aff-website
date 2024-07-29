import { useToast } from "@/components/ui/use-toast";
import { api, setAuthToken } from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";

export function createTradeOffer(data: any, token: string) {
  setAuthToken(token);
  return api.post("/trades", data);
}
export function useCreateTradeOffer(token: string) {
  return useMutation({
    mutationFn: (data: any) => createTradeOffer(data, token),
    onSuccess: (data) => {
      toast.success("Trade offer created successfully.");
    },
    onError: (error) => {
      toast.error("Failed to create trade offer.");
    },
  });
}
