"use client";

import { useState } from "react";

import { Datepicker } from "@/app/components/datepicker";

import { IGamePostData } from './types';

export default function Page() {
  const initGameData: IGamePostData = {
    season_id: "",
    tour_id: "",
    time: "",
    player1: "",
    player2: "",
    player1_score: null,
    player2_score: null,
    winner: "",
    winner_points: "",
  };
  
  const [games, setGames] = useState([]);

  const getGameForm = (index: number) => {
    return (
      <div className='width-full'>
        <Datepicker />
      </div>
    );
  };

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='bg-green-100 w-full rounded-lg p-2 mt-2'>
        На данной страничке добавляем матчи сыгранные за игровой день
      </div>

      {getGameForm(games.length)}
    </main>
  );
}
