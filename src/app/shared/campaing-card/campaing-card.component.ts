import { Component, Input, OnInit } from '@angular/core';
import {Campaing} from "../../campaing/models/Campaing";
import { Router} from '@angular/router';


@Component({
  selector: 'app-campaing-card',
  templateUrl: './campaing-card.component.html',
  styleUrls: ['./campaing-card.component.scss']
})
export class CampaingCardComponent implements OnInit {
  @Input() public campaings: Campaing[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {    
  }
  public redirect(id:number){
    this.router.navigate(['/home/form/'+id]); 
  }


}
