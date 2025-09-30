import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { WeatherService } from 'src/app/weather.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [SharedModule],
})
export class Tab1Page implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: SafeUrl | undefined;
  city: string = 'Santiago';
  //units: string = 'metric'
  units: string = 'metric'; // 'metric' para Celsius, 'imperial' para Fahrenheit

  constructor(
    private sanitizer: DomSanitizer,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getweather(this.city, this.units).subscribe({
      next: (res: any) => {
        const iconCode = res.weather[0].icon;
        const rawUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.iconURL = this.sanitizer.bypassSecurityTrustUrl(rawUrl);
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
      },
      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed'),
    });
  }
}
