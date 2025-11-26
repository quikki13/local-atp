export interface ITourApi {
  id: string;
  season_id: string;
  year: number;
  month: number;
  day: number;
}

export interface ITour extends ITourApi {
  season: string
};

export interface ISeasonMap {
  [key: string]: string;
}