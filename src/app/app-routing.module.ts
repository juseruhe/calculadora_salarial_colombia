import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/calculator/calculator.module').then(m=> m.CalculatorModule)
  },
  {
    path: 'resultados',
    loadChildren: () => import('./pages/results/results.module').then(m=> m.ResultsModule)
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
