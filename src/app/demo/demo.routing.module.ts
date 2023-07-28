import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component'
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'demo', component: DefaultComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DemoRoutingModule { }
