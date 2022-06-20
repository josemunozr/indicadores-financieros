import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from '../data-list/data-list.component';
import { ListIndicatorsComponent } from './list-indicators.component';

const routes: Routes = [
  {
    path: '',
    component: ListIndicatorsComponent,
    children: [{
      path: ':indicator',
      component: DataListComponent
      // loadChildren: () => import('../data-list/data-list-routing.module').then(module => module.DataListRoutingModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListIndicatorsRoutingModule { }
