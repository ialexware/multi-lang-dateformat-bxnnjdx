import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, combineLatestWith } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

export enum Languages {
  en = 'en',
  de = 'de',
  fr = 'fr',
  es = 'es',
}

@Component({
  selector: 'app-multi-lang-date',
  templateUrl: './multi-lang-date.component.html',
  styleUrls: ['./multi-lang-date.component.css'],
})
export class MultiLangDateComponent implements OnInit {
  public selectedDate: Date = new Date();
  public dateControl = new FormControl(this.selectedDate, [
    Validators.required,
  ]);

  public languageList: string[] = [];
  /**
   * Getter and setter for the minimum date which is available for selection.
   */
  @Input() get minDate(): Date | undefined {
    return this.minLocalDate!;
  }
  /**
   * Setter for the minimum date which is available for selection.
   */
  set minDate(value: Date | undefined) {
    if (value) {
      value?.setHours(0, 0, 0, 0);
      if (value !== this.minLocalDate) {
        this.minLocalDate = value;
        this.dateControl.updateValueAndValidity();
      }
    }
  }

  /**
   * Getter and setter for the maximum date which is available for selection.
   */
  @Input() get maxDate(): Date | undefined {
    return this.maxLocalDate!;
  }

  /**
   * Setter for the maximum date which is available for selection.
   */
  set maxDate(value: Date | undefined) {
    if (value) {
      value?.setHours(0, 0, 0, 0);
      if (value !== this.maxLocalDate) {
        this.maxLocalDate = value;
        this.dateControl.updateValueAndValidity();
      }
    }
  }
  /**
   * Min date to ensure that the date provided to 'ngx-bootstrap/datepicker' has no hours.
   */
  public minLocalDate?: Date;

  /**
   * Max date to ensure that the date provided to 'ngx-bootstrap/datepicker' has no hours.
   */
  public maxLocalDate?: Date;

  public placeholder?: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.placeholder = this.getDisplayableLocaleFormat()
  }

  ngOnInit() {
    this.languageList = Object.keys(Languages).filter(String);
  }

  useLanguage(language: Languages): void {
    this.translateService.use(language);
    this.dateAdapter.setLocale(language);
  }

  /**
   * Return the date formatted
   * @param {String} date Date to format
   * @returns A string with the date formatted according to the locale
   */
  public formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language).format(date);
  }

      /**
     * Return a locale specific date format that does not contain ambiguous values (i.e. yy vs YYYY)
     * @return Observable<string> displayable localized format
     */
       getDisplayableLocaleFormat(): Observable<string> {
        return this.translateService.get('ui_datepicker_format_letter_day').pipe(
            combineLatestWith(
                this.translateService.get('ui_datepicker_format_letter_month')
            ),
            combineLatestWith(
                this.translateService.get('ui_datepicker_format_letter_year')
            ),
            map(([[day, month], year]) =>
                this.expandFormat(this.getDateFormat(), day, month, year)
            )
        );
    }

        /**
     * Expand format string.
     *
     * @param format
     * @param dayLetter
     * @param monthLetter
     * @param yearLetter
     */
         expandFormat(
          format: string,
          dayLetter: string,
          monthLetter: string,
          yearLetter: string
      ): string {
          const dayRegexp = /d+/i,
              dayLiteral = dayLetter.repeat(2),
              monthRegexp = /M+/i,
              monthLiteral = monthLetter.repeat(2);
          return this.expandYears(format, yearLetter)
              .replace(dayRegexp, dayLiteral)
              .replace(monthRegexp, monthLiteral);
      }
  
      /**
       * Expand years format string
       * @param format
       * @param yearLetter
       */
      expandYears(format: string, yearLetter: string): string {
          const yearRegexp = /y+/i,
              yearLiteral = yearLetter.repeat(4);
          return format.replace(yearRegexp, yearLiteral);
      }

    /**
     * Get the date format according to the user configuration language using the Intl API
     * as the MatNativeDateModule does.
     * @returns {string} Returns the date format according to the user configuration language
     */
     getDateFormat() {
      const formatter = new Intl.DateTimeFormat(this.language).formatToParts();
      return formatter
          .map((e) => {
              switch (e.type) {
                  case 'month':
                      return 'mm';
                  case 'day':
                      return 'dd';
                  case 'year':
                      return 'yyyy';
                  default:
                      return e.value;
              }
          })
          .join('');
  }
}
