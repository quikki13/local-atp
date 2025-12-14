export interface IResultsTableApiData {
  season_id: string;
  player_id: string;
  score: number;
}

export interface IResultsTableData extends IResultsTableApiData {
  personName: string;
}

export interface IResult {
  [key: string]: string;
}