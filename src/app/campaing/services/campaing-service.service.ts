import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Campaing} from "../models/Campaing";
import {CampaingStatus} from "../models/CampaingStatus";
import {CampaingType} from "../models/CampaingType";
import {GLOBAL} from './global';

@Injectable({
  providedIn: 'root'
})
export class CampaingServiceService {
  public url:string;

  constructor(private http: HttpClient) { 
    this.url = GLOBAL.url;
  }
  getCampaings():Observable<Campaing[]>{
    return this.http.get<Campaing[]>(`${this.url}/campanhas`);
  }
  getCampaing(id:number|string):Observable<Campaing>{
    return this.http.get<Campaing>(`${this.url}/campanha/${id}`);
  }
  saveCampaing(campanha:Campaing){    
    return this.http.post(`${this.url}/createCampanha`,campanha);
  }

  updateCampaing(id:number|string,campaing:Campaing){
    return this.http.put(`${this.url}/updateCampanha/${id}`,campaing);  
  }

  deleteCampaing(id: string|number) {
    return this.http.delete(`${this.url}/deleteCampanha/${id}`);
  }

  getStatus():Observable<CampaingStatus[]>{
    return this.http.get<CampaingStatus[]>(`${this.url}/estatus`);
  }

  getType():Observable<CampaingType[]>{
    return this.http.get<CampaingType[]>(`${this.url}/tipos`);
  }

}
