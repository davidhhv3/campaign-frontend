import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaingRoutingModule } from './campaing-routing.module';
import { CampaingListComponent } from './components/campaing-list/campaing-list.component';
import { CampaingFormComponent } from './components/campaing-form/campaing-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialDesingModule } from '../material-desing/material-desing.module';


@NgModule({
  declarations: [
    CampaingListComponent,
    CampaingFormComponent
  ],
  imports: [
    CommonModule,
    CampaingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialDesingModule,
    SharedModule
  ]
})
export class CampaingModule { }
