import { NgModule } from '@angular/core';
import { DefaultComponent } from './default/default.component';
import { ComponentsModule } from '../components/components.module'
import { DemoRoutingModule } from './demo.routing.module'

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    ComponentsModule,
    DemoRoutingModule
  ],

})
export class DemoModule { }
