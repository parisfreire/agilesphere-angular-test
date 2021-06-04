import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../reducers/weather';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeatherList = createSelector(
    selectWeatherState,
    state => state.weatherList
);

export const selectError = createSelector(
    selectWeatherState,
    state => state.error
);

export const selectIsLoading = createSelector(
    selectWeatherState,
    state => state.isLoading
);