import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { reducers, WeatherState } from '../weather/store/reducers/weather';
import { WeatherEffects } from '../weather/store/effects/weather';
import { Search } from './store/actions/weather';


describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;

  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      providers: [WeatherService],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('weather', reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([WeatherEffects])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an event when a city is searched', () => {
    const city = 'London';
    const searchCityAction = new Search(city);
    component.onSearch(city);
    expect(store.dispatch).toHaveBeenCalledWith(searchCityAction);
  });
});