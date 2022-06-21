import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './components/data-list/data-list.component';
import { DetailIndicatorComponent } from './components/detail-indicator/detail-indicator.component';
import { ListIndicatorsComponent } from './components/list-indicators/list-indicators.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-indicators',
    pathMatch: 'full'
  },
  {
    path: 'list-indicators',
    component: ListIndicatorsComponent
  },
  {
    path: 'list-indicators/:indicator',
    component: DataListComponent
  },
  {
    path: 'list-indicators/:indicator/detail',
    component: DetailIndicatorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
