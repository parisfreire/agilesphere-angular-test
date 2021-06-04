import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { Actions } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { Search, SearchComplete, SearchError } from '../actions/weather';
import { WeatherEffects } from '../effects/weather';
import { WeatherService } from '../../weather.service';
import { Weather } from '../../../model/weather';

describe('Weather effects', () => {
    let actions$: Observable<any>;
    let effects: WeatherEffects;
    let weatherService: WeatherService;

    const weather: Weather = {
        city: {
            id: 1,
            name: 'London'
        }
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                WeatherEffects,
                {
                    provide: WeatherService,
                    useValue: {
                        searchWeatherForCity: jasmine.createSpy()
                    }
                },
                provideMockActions(() => actions$),
            ]
        });
        actions$ = TestBed.get(Actions);
        weatherService = TestBed.get(WeatherService);
        effects = TestBed.get(WeatherEffects);
    });

    it('should return a search complete with a successful response', () => {

        const action = new Search('London');
        const outcome = new SearchComplete(weather);

        actions$ = hot('-a', { a: action });
        const response = cold('-a|', { a: weather });
        const expected = cold('--b', { b: outcome });

        weatherService.searchWeatherForCity = jasmine.createSpy().and.returnValue(response);
        expect(effects.search$).toBeObservable(expected);
    });

    it('should return a search error with an error message', () => {

        const action = new Search('London');
        const outcome = new SearchError('Error');

        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, 'Error');
        const expected = cold('--b', { b: outcome });

        weatherService.searchWeatherForCity = jasmine.createSpy().and.returnValue(response);
        expect(effects.search$).toBeObservable(expected);
    });

});