import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setupFontAwesomeIcons } from './app/fontawesome.config';

setupFontAwesomeIcons();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
