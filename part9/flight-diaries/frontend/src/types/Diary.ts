import { Weather } from "./enums/Weather";
import { Visibility } from "./enums/Visibility";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
