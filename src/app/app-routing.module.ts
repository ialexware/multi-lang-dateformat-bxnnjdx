import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full',
  },

  {
    path: 'demo',
    loadChildren: () =>
      import('./demo/demo.module').then((m) => m.DemoModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
