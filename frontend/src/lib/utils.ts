import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENT_SEASON_ID = 9;
export const SEASON_STAGE = "preseason";
export const TRADE_WINDOW: "open" | "closed" = "closed";
