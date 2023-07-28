import { NgModule } from '@angular/core';
import { MultiLangDateComponent } from './multi-lang-date/multi-lang-date.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    MultiLangDateComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule
  ],
  exports: [
    MultiLangDateComponent
  ]
})
export class ComponentsModule { }
