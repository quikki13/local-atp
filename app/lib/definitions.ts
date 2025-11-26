// This file contains type definitions for db data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Player = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type PlayersInGame = {
  id: string;
  score: number;
};

export type PointsForGame = {
  // Победивший игрок
  id: string;
  // количество очков, набранных победителем
  score: number;
};

export type Game = {
  // id матча
  id: "85002605-1c19-4ebc-8977-d9336c498dba";
  // id сезона
  season_id: "7049439c-2d1d-4663-8c20-8f3eee319283";
  // id турнира (игрового дня)
  tour_id: "69ba133d-753b-4019-ab0e-eccfe1972435";
  // время игры
  time: string;
  // дата игры
  month: number;
  day: number;
  year: number;
  // учавствующие игроки и выигранные ими сеты
  players: PlayersInGame[];
  points: PointsForGame;
};

export type Tour = {
  // id игрового дня
  id: string;
  // id сезона
  season_id: string;
  // дата турнира
  month: number;
  year: number;
  day: number;
  // Итоговая таблица турнира
  table: ScoreItem[];
};

export type Season = {
  // id сезона
  id: string;
  // год сезона
  year: number;
  // название
  name: string;
};

export type ScoreItem = {
  // id игрока
  id: string;
  // набранные очки игроком
  score: number;
}