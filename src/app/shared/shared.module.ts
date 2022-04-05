import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CampaingCardComponent } from './campaing-card/campaing-card.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialDesingModule } from '../material-desing/material-desing.module';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CampaingCardComponent,
    DialogComponent,
    FormButtonsComponent
  ],
  imports: [
    CommonModule,
    MaterialDesingModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    CampaingCardComponent,
    DialogComponent,
    FormButtonsComponent
  ]
})
export class SharedModule { }
