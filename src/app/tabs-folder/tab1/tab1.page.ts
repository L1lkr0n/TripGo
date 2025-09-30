import { Component,OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from 'src/app/detail-modal/detail-modal.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, trashOutline, pencilOutline } from 'ionicons/icons';
import { WeatherService } from 'src/app/weather.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// Registrar el icono del FAB
addIcons({
  'arrow-forward-outline': arrowForwardOutline,
  'trash-outline': trashOutline,
  'pencil-outline': pencilOutline
});

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [SharedModule],
})
export class Tab1Page implements OnInit {
  itinerary = [{ title: '', time: '', description: '', transport: '' }];

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

  constructor(private sanitizer: DomSanitizer,private weatherService: WeatherService,private modalCtrl: ModalController, private router: Router) {}

  ngOnInit(): void{
    this.getWeather();
  }

  
  getWeather() {
    this.weatherService.getweather(this.city, this.units).subscribe({
      next: (res : any) => {
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

      complete: () => console.info('API call completed')
    })

  }

async openDetails(index: number) {
  const modal = await this.modalCtrl.create({
    component: DetailModalComponent,
    componentProps: { item: { ...this.itinerary[index] } },
  });

  modal.onDidDismiss().then((res) => {
    if (res.data) {
      this.itinerary[index] = res.data;

      // Si el usuario llenó algo y es el último card → crea uno nuevo vacío
      const lastIndex = this.itinerary.length - 1;
      const lastCard = this.itinerary[lastIndex];
      if (
        lastCard.title.trim() !== '' ||
        lastCard.time.trim() !== '' ||
        lastCard.description.trim() !== ''
      ) {
        // Solo agrega uno nuevo si el último card está lleno
        this.itinerary.push({ title: '', time: '', description: '', transport: '' });
      }
    }
  });

  await modal.present();
}

  deleteCard(index: number) {
    if (this.itinerary.length > 1) {
      this.itinerary.splice(index, 1);
    }
  }

  hasFilledCard(): boolean {
    // Ignora el último card (vacío)
    return this.itinerary
      .slice(0, this.itinerary.length - 1)
      .some(
        (item) =>
          item.title.trim() !== '' ||
          item.time.trim() !== '' ||
          item.description.trim() !== ''
      );
  }

  goToNextTab() {
    // Aquí colocas la ruta de tu siguiente tab
    this.router.navigate(['/tabs/tab2']);
  }
}
