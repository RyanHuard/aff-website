import { Separator } from "@/components/ui/separator";
import { PlayerStats } from "@/types/player";
import React from "react";

type WeeklyStatLeaderBoxProps = {
  category: string;
  players: PlayerStats[] | undefined;
};

function WeeklyStatLeaderBox({ category, players }: WeeklyStatLeaderBoxProps) {
  return (
    <div className="h-24 py-3 px-4 flex">
      <div>
        <h1 className="font-semibold text-sm ">{category} this week</h1>
        <div className="flex pt-[2px]">
          <img src={`/players/Scott_Lopez.png`} className="h-12 mt-1" />
          <div className="flex-col flex px-4 text-sm">
            <span>
              {players?.[0].first_name} {players?.[0].last_name} ·{" "}
              {players?.[0].position}
            </span>
            <span className="font-semibold text-2xl">
              {players?.[0].match_pass_yards}
            </span>
          </div>
        </div>
      </div>
      <Separator className="bg-black" />
      <div className="px-4">
        <ul>
          {players?.map((player, index) => {
            if (index >= 1) {
              return (
                <li key={index} className="text-xs mt-[2px]">
                  {index}. {player.first_name[0]}. {player.last_name} {player.match_pass_yards}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
}

export default WeeklyStatLeaderBox;
