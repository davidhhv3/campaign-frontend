import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingFormComponent } from './components/campaing-form/campaing-form.component';
import { CampaingListComponent } from './components/campaing-list/campaing-list.component';

const routes: Routes = [
  {path:'',component:CampaingListComponent},
  {path:'form',component:CampaingFormComponent},
  {path:'form/:id',component:CampaingFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaingRoutingModule { }
