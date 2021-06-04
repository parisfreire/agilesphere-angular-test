import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';

export enum WeatherActionType {
  SEARCH = '[Weather] Search',
  SEARCH_COMPLETE = '[Weather] Search Complete',
  SEARCH_ERROR = '[Weather] Search Error',
}

export class Search implements Action {
  readonly type = WeatherActionType.SEARCH;
  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = WeatherActionType.SEARCH_COMPLETE;
  constructor(public payload: Weather) {}
}

export class SearchError implements Action {
  readonly type = WeatherActionType.SEARCH_ERROR;
  constructor(public payload: string) {}
}

export type WeatherActions = Search | SearchComplete | SearchError;