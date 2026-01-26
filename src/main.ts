import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import PrimeNG styles
// import 'primeng/resources/primeng.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
