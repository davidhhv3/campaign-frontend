import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeRoutingModule } from './home/home-routing.module';

const routes: Routes = [
  {
    path:'',pathMatch:"full",redirectTo:'/home'
  },
  {
    path:'login',component:AuthComponent
  },
  {
    path:'**',pathMatch:"full",redirectTo:'/home'
  } 

];

@NgModule({
  imports: [HomeRoutingModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
