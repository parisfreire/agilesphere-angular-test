import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Weather } from '../model/weather';


@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: string) {
    const params = {
      q: city,
      cnt: '8',
      units: 'metric',
      APPID: environment.openWeatherMap.appId
    };

    return this.http.get<Weather>(environment.openWeatherMap.apiUrl, { params });
  }

}
