import { Component, OnInit } from '@angular/core';
import { Aeropuerto } from 'src/app/shared/models/aeropuerto.model';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { BusquedaVuelo } from 'src/app/shared/models/vuelo.model';

@Component({
  selector: 'app-formulario-vuelo-v2',
  templateUrl: './formulario-vuelo-v2.component.html',
  styleUrls: ['./formulario-vuelo-v2.component.scss'],
  providers: [AeropuertosService, VuelosService],
})
export class FormularioVueloV2Component {
  public errorPasajeros:Number;
  public origen:string;
  public destino:string;
  public fechaIda:string;
  public fechaVuelta:string;
  public pasajeros:any;
  public max_adultos:number;
  public max_ninos:number;
  public max_infantes:number;
  public max_adultos_mayores:number;
  public options:number;
  vuelos_ida:any[];
  vuelos_vuelta:any[];
  aeropuertos:any;
  lugares:any[];
  origenes:any[];
  destinos:any[];
  datePipe: any;
  today : any;
  maxDate : any;
  existe_ida:boolean;
  existe_vuelta:boolean;
  constructor(private fb: FormBuilder,
    private cookieService: CookieService,
    private _aeropuertoService: AeropuertosService,
    private _vueloService: VuelosService,
    private _router:Router,
    private _route:ActivatedRoute
    ) {
      this.destino="";
      this.origen="";
      this.fechaIda="";
      this.fechaVuelta="";
      this.today = new Date().toISOString().split('T')[0];
      this.maxDate = new Date(new Date().getTime() + 360 * 24 * 60 * 60 * 1012).toISOString().split('T')[0]
      this.pasajeros={adultos_mayores:0, adultos:1, ninos:0, infantes:0};
      this.errorPasajeros=-1;
      this.max_adultos=10;
      this.max_ninos=9;
      this.max_infantes=5;
      this.max_adultos_mayores=9;
      this.options=1;
      this.existe_ida=false;
      this.existe_vuelta=false;
}
ngOnInit(): void {
  this._aeropuertoService.getAeropuertos().subscribe(
    (response) => {
      this.aeropuertos = response;
      this.lugares = this.aeropuertos.Aeropuertos;
      this.origenes=this.lugares.slice();
      this.destinos=this.lugares.slice();
    },error=>{
      console.log(<any>error);
  });
}

selectOrigen(value:any){
  this.origenes=this.lugares.slice();
  this.destinos=this.lugares.slice();
  let indexO=-1;
  let indexD=-1;
  for(let i=0; i<this.lugares.length;i++){
    if (this.origenes[i]._id==this.origen){
      indexO=i;
    }
    if (this.destinos[i]._id==this.destino){
      indexD=i;
    }
  }
  if (indexO!=-1){
    this.destinos.splice(indexO,1);
  }
  if (indexD!=-1){
    this.origenes.splice(indexD,1);
  }
}
selectDestino(value:any){
  this.destinos=this.lugares.slice();
  this.origenes=this.lugares.slice();
  let index=0;
  for(let i=0; i<this.destinos.length;i++){
    if (this.destinos[i]._id==this.destino){
      index=i;
    }
  }
  this.origenes.splice(index,1);
}
comprobarPasajeros(value: any) {
  if (this.pasajeros.adultos <= 0 && this.pasajeros.adultos_mayores <=0) {
      this.errorPasajeros = 1;
  } else {
      if (this.pasajeros.infantes > this.pasajeros.adultos) {
        this.errorPasajeros = 2;
      } else {
        this.errorPasajeros = -1;
      }
    }

  this.max_adultos_mayores=10-this.pasajeros.ninos-this.pasajeros.infantes-this.pasajeros.adultos;
  this.max_adultos=10-this.pasajeros.ninos-this.pasajeros.infantes-this.pasajeros.adultos_mayores;
  this.max_ninos=10-this.pasajeros.adultos-this.pasajeros.infantes-this.pasajeros.adultos_mayores;

  if (this.pasajeros.adultos+this.pasajeros.ninos+this.pasajeros.infantes+this.pasajeros.adultos_mayores<10){
    if (10-(this.pasajeros.adultos+this.pasajeros.ninos+this.pasajeros.infantes+this.pasajeros.adultos_mayores)>=this.pasajeros.adultos){
      this.max_infantes=this.pasajeros.adultos;
    }
  }else{
    this.max_infantes=10 - this.pasajeros.adultos - this.pasajeros.ninos - this.pasajeros.adultos_mayores;
  }
  }
  
  // console.log(this.max_pasajeros);
  // console.log(this.errorPasajeros);

postBusqueda(form:NgForm){
  let formEnvio={
    options:this.options,
    origen:this.origen,
    destino:this.destino,
    fechaIda:this.fechaIda,
    fechaVuelta:this.fechaVuelta,
    pasajeros:this.pasajeros
  }
  this.cookieService.set('busqueda',(JSON.stringify(formEnvio)));
  this._vueloService.buscarVuelos(formEnvio).subscribe(
    response=>{
        response.result.vuelos_ida ? this.existe_ida = true : this.existe_ida=false;
        response.result.vuelos_vuelta ? this.existe_vuelta = true : this.existe_vuelta=false;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  this._router.navigate(['/vuelos/','ida'])
  }
}
