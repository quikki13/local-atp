export interface IGamePostData {
  season_id: string;
  tour_id: string;
  time: string;
  player1: string;
  player2: string;
  player1_score: number | null;
  player2_score: number | null;
  winner: string;
  winner_points: string;
}
