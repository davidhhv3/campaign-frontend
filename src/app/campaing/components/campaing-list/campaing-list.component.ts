import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import {Campaing} from "../../models/Campaing";
import {CampaingServiceService} from "../../services/campaing-service.service";

@Component({
  selector: 'app-campaing-list',
  templateUrl: './campaing-list.component.html',
  styleUrls: ['./campaing-list.component.scss']
})
export class CampaingListComponent implements OnInit {
  public campaings:Campaing[]=[];  

  constructor(private campaingServiceService:CampaingServiceService,private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.getCampaings();
  }
  getCampaings(){
    this.loadingService.setLoading(true);
    this.campaingServiceService.getCampaings()
    .subscribe(
      res=>{
        this.campaings=res; 
        this.loadingService.setLoading(false);       
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);  
      }
    )
  }

}
