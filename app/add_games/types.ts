import { ISeason } from "@/app/seasons/types";
import { ITour } from "@/app/tours/types";
import { IPlayer } from "@/app/players/types";

export interface IGamePostData {
  id: string,
  season_id: string;
  tour_id: string;
  time: string;
  player1: string;
  player2: string;
  player1_score: string;
  player2_score: string;
  winner: string;
  winner_points: string;
}

export interface IResponseData {
  seasons: ISeason[];
  players: IPlayer[];
  tours: { [key: string]: ITour[] };
}

export type SelectType = keyof IGamePostData;