import { FilterType } from "./FilterType"

export type ProjectFilter = {
  name: FilterType;
  date: FilterType;
  search?: string;
}