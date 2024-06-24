import { PlayerStats } from '@/types/player';
import React from 'react'



type WeeklyStatLeaderBoxProps = {
    category: string;
    players: PlayerStats[];
}

function WeeklyStatLeaderBox({ category, players }: WeeklyStatLeaderBoxProps) {
  return (
    <div>weekly-stat-leaders</div>
  )
}

export default WeeklyStatLeaderBox;