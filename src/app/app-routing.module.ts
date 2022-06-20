import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './components/data-list/data-list.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
