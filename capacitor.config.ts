import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TripGo',
  webDir: 'www',
  server: {
    allowNavigation: [
      'openweathermap.org'
    ]
  }
};

export default config;
