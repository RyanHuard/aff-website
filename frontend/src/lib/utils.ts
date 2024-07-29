import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENT_SEASON_ID = 7;
export const SEASON_STAGE = "postseason";
export const TRADE_WINDOW = "closed";
