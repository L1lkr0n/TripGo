import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getweather(city: string, units: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}&units=${units}`);
  }

}