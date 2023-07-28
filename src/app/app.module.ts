import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { DemoModule } from './demo/demo.module';
import { CustomDatePickerAdapter, CUSTOM_DATE_FORMATS } from './components/multi-lang-date/date-adapter';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de', localeDeExtra);
registerLocaleData(localeFr, 'fr', localeFrExtra);
registerLocaleData(localeEs, 'es', localeEsExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/general/', suffix: '.json' },
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DemoModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    /* Material imports*/
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDatePickerAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'de', 'fr', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
