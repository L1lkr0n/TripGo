import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'Trip.Go',
  appName: 'TripGo',
  webDir: 'www',
  server: {
    allowNavigation: [
      'openweathermap.org'
    ]
  }
};

export default config;
