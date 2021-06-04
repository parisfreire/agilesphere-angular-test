import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { WeatherActionType, Search, SearchComplete, SearchError } from '../actions/weather';
import { WeatherService } from '../../weather.service';
import { Weather } from '../../../model/weather';

@Injectable()
export class WeatherEffects {

constructor(private actions$: Actions, private weatherService: WeatherService) {}

  @Effect()
  search$: Observable<SearchComplete | SearchError> = this.actions$.ofType(WeatherActionType.SEARCH).pipe(
    switchMap((action: Search) => {
      return this.weatherService.searchWeatherForCity(action.payload)
        .pipe(
          map((payload: Weather) => new SearchComplete(payload)),
          catchError((error: string) => Observable.of(new SearchError(error)))
        );
    })
  );   

  
}