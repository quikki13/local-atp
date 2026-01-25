import { ISeason } from "@/app/seasons/types";
import { SetStateAction, Dispatch } from "react";

export interface ITourApi {
  id: string;
  season_id: string;
  name: string;
  date: string;
}

export interface ITour extends ITourApi {
  // name of season
  season: string;
}

export interface ISeasonMap {
  [key: string]: string;
}

export interface ITourWithSeason {
  tours: ITour[];
  seasons: Omit<ISeason, "year">[];
}

export interface IDialogContentProps {
  seasons: Omit<ISeason, "year">[];
  setToursData: Dispatch<SetStateAction<ITourWithSeason>>;
}
