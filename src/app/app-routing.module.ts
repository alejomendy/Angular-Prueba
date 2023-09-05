import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes = [
  {
    path: 'movimientos',
   component: BaseComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: '',
    redirectTo: 'movimientos', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
