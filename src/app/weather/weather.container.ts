import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { selectWeatherList, selectIsLoading, selectError } from './store/selectors/weather';
import { Search } from './store/actions/weather';
import { WeatherState } from './store/reducers/weather';
import { Weather } from '../model/weather';


@Component({
  selector: 'app-weather',
  template: `
  <app-search (search)="onSearch($event)" [error]="error$ | async"></app-search>
  <app-results [weatherList]="weatherList$ | async" [isLoading]="isLoading$ | async"></app-results>  `
})
export class WeatherContainer {

  weatherList$: Observable<Weather[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<WeatherState>) {}

  ngOnInit() {
    this.weatherList$ = this.store.pipe(select(selectWeatherList));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
 }

  onSearch(city: string) {
    this.store.dispatch(new Search(city));
  }
}
