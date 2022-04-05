import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import {CampaingServiceService} from "../../services/campaing-service.service";
import {CampaingStatus} from "../../models/CampaingStatus";
import {CampaingType} from "../../models/CampaingType";
import {Campaing} from "../../models/Campaing";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-campaing-form',
  templateUrl: './campaing-form.component.html',
  styleUrls: ['./campaing-form.component.scss']
})
export class CampaingFormComponent implements OnInit {
  date= Date.now();
  campaing: Campaing = {
    idCampanha: null,
    Tipo_idTipo:     1,
    Estatus_idEstatus:    1,
    num_users:  1,
    titulo:     '',
    creacion:   '',
    envio:      '9/19/21,10:44pm'
  }; 
  formGroup: FormGroup;  
  campaingStatus:CampaingStatus[]=[];
  campaingTypes:CampaingType[]=[];
  edit: boolean = false;
  questionText:string="";
  idCampaing:number=0;

  constructor(private formBuilder:FormBuilder,
             private campaingService:CampaingServiceService,
             public router: Router, 
             private activatedRoute: ActivatedRoute,
             private loadingService:LoadingService,
             private toastr:ToastrService,
             private dialog: MatDialog) { 

    this.formGroup = this.formBuilder.group({   
      titulo:  ["",  [Validators.required]],
      Tipo_idTipo:  ["",  [Validators.required]] ,
      Estatus_idEstatus:  ["",  [Validators.required]],
      num_users:  ["",[Validators.required]]         
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.edit = true;
      this.getCampaing(params.id);
      this.idCampaing=params.id;
    }
    this.getTypes();
    this.getStatus();
  }
  validateForm(e:string){
    const titleField = this.formGroup.get('titulo');
    const typeField = this.formGroup.get('Tipo_idTipo');
    const statusField = this.formGroup.get('Estatus_idEstatus');
    const numUsersField = this.formGroup.get('num_users');
    if (this.formGroup.valid) {
      if(e == "save"){        
        this.saveCampaing();
      }else{
        this.openDialog(e);
      }
   
    }else if (titleField?.invalid &&   typeField ?.invalid && statusField?.invalid && numUsersField?.invalid){
      this.formGroup.markAllAsTouched();
      this.toastr.warning("Ingrese todos los campos requeridos");        
    }else if (titleField?.invalid) {      
      this.toastr.warning("Ingrese el título");         
    }else if (typeField?.invalid) {
      this.toastr.warning("Seleccione el tipo");            
    }else if (statusField?.invalid) {
      this.toastr.warning("Seleccione el estado");                
    }else if (numUsersField?.invalid) {
      this.toastr.warning("Ingrese el numero de usuarios");             
    }       
  }
  saveCampaing(){
    this.campaing=this.formGroup.value;
    this.campaing.creacion=this.date.toString();
    this.campaing.envio="9/19/21,10:44pm"; 
    this.loadingService.setLoading(true);
    this.campaingService.saveCampaing(this.campaing)
    .subscribe(
      res=>{        
        this.router.navigate(['/home']);
        this.loadingService.setLoading(false);
        this.toastr.success('Campaña creada','');
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.success('Ha ocurrido un error','');
      }
    )
  }
  public deleteCampaing(){
    this.loadingService.setLoading(true);
    this.campaingService.deleteCampaing(this.campaing.idCampanha)
    .subscribe(
      res=>{
        this.router.navigate(['/home']);
        this.loadingService.setLoading(false);
        this.toastr.success("Campaña eliminada");
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
        this.toastr.success('Ha ocurrido un error','');
      }
    )
  }
  public openDialog(e:string){ 
    if(e == "delete"){
      this.questionText="¿Está seguro de eliminar esta campaña?";
    }
    if(e == "update"){
      this.questionText="¿Está seguro de modificar esta campaña?";
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.questionText,confirm:e},  
      panelClass: 'dialog-success'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "delete"){
        this.deleteCampaing();
      } 
    
      if(result == "update"){
       this.updateCampaing();    
     } 
   }); 
  }
  updateCampaing(){
    this.campaing=this.formGroup.value;
    this.campaing.creacion=this.date.toString();
    this.campaing.envio="9/19/21,10:44pm"; 
    this.campaing.idCampanha=this.idCampaing;
    this.loadingService.setLoading(true);
    this.campaingService.updateCampaing(this.campaing.idCampanha,this.campaing)
    .subscribe(
      res=>{
        this.toastr.success("Campaña modificada");
        this.router.navigate(['/home']);
        this.loadingService.setLoading(false);
      },
      err=>{
        console.log(err);
        this.toastr.error("Ha ocurrido un error");
        this.loadingService.setLoading(false);
      }
    )
  }
  getCampaing(id:number){
    this.loadingService.setLoading(true);
    this.campaingService.getCampaing(id)
    .subscribe(
      res=>{
        this.campaing=res;
        this.formGroup.get('titulo')?.setValue(this.campaing.titulo);
        this.formGroup.get('Tipo_idTipo')?.setValue(this.campaing.Tipo_idTipo);
        this.formGroup.get('Estatus_idEstatus')?.setValue(this.campaing.Estatus_idEstatus);
        this.formGroup.get('num_users')?.setValue(this.campaing.num_users);
        this.loadingService.setLoading(false);
      },err=>{
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )
  }
  getTypes(){
    this.loadingService.setLoading(true);
    this.campaingService.getType()
    .subscribe(
      res=>{
        this.campaingTypes=res;
        this.loadingService.setLoading(false);
      },
      err=>{
        this.loadingService.setLoading(false);
        console.log(err);
      }
    )
  }
  getStatus(){
    this.loadingService.setLoading(true);
    this.campaingService.getStatus()
    .subscribe(
      res=>{
        this.campaingStatus=res;           
        this.loadingService.setLoading(false);
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false);
      }
    )
  }
  public invalidFields(field: string) {   
    const fieldName = this.formGroup.get(field);     
    return fieldName?.touched && fieldName?.invalid;    
  }

}
