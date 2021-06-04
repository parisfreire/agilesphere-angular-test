import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { Weather } from '../../../model/weather';
import { reducers, WeatherState } from "../reducers/weather";
import { selectWeatherState, selectWeatherList } from "../selectors/weather";
import { SearchComplete } from '../actions/weather';

describe('Selectors', () => {

  let store: Store<WeatherState>;      

  const mockWeather: Weather = {
    city: {
      id: 1,
      name: 'London'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('weather', reducers)
      ],
    });
    store = TestBed.get(Store);
  });

  it('should get the weather state', (done) => {
    store.dispatch(new SearchComplete(mockWeather));
    store.select(selectWeatherState)
    .subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.weatherList.length).toBe(1);
        expect(result.weatherList[0].city.name).toBe('London');
        expect(result.weatherList[0].city.id).toBe(1);
        done();
      });
    });

  it('should get London weather', (done) => {
    store.dispatch(new SearchComplete(mockWeather));
    store.select(selectWeatherList)
    .subscribe(weatherList => {
        expect(weatherList).toBeTruthy();
        expect(weatherList.length).toBe(1);
        expect(weatherList[0].city.name).toBe('London');
        expect(weatherList[0].city.id).toBe(1);
        done();
      });
  });
});