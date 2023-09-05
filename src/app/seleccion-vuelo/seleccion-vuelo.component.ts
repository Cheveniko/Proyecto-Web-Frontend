import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { VuelosService } from '../services/vuelos.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-vuelo',
  templateUrl: './seleccion-vuelo.component.html',
  styleUrls: ['./seleccion-vuelo.component.scss'],
  providers: [VuelosService]
})
export class SeleccionVueloComponent implements OnInit{
  busqueda:any;
  title:string;
  vuelos:any;
  result:any;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _cookieService:CookieService,
    private _vueloService:VuelosService
  ){
    this.busqueda=JSON.parse(this._cookieService.get('busqueda'));
    this._route.params.subscribe(
      params=>{
        let tipo = params['tipo'];
        this.getData(tipo);
      }
    );
  }
  ngOnInit(): void {
    
  }
  getData(tipo:string){
    this._vueloService.buscarVuelos(this.busqueda).subscribe(
      response=>{
        if (tipo=='ida'){
          this.title='SELECCIONA TU VUELO DE IDA';
          this.vuelos=response.result.vuelos_ida;
        }
        if (tipo=='vuelta'){
          this.title='SELECCIONA TU VUELO DE VUELTA';
          this.vuelos=response.result.vuelos_vuelta;
        }
      },error=>{console.log(error)}
    );
  }
  guardarInfo(vuelo_id:string, clase:string, precio:number){
    console.log(vuelo_id);
    this._route.params.subscribe(
      params=>{
        let tipo = params['tipo'];
        let vuelos:any[];
        vuelos=[]
        if(this._cookieService.check('informacionPasajeros')){
          vuelos = JSON.parse(this._cookieService.get('informacionPasajeros'));
        }
        // console.log(vuelos);

        let informacion = {
          vuelo_id: vuelo_id,
          clase: clase,
          precio:precio
        }
        if(tipo=='ida'){
          vuelos[0]=informacion;

        }
        if(tipo=='vuelta'){
          vuelos[1]=informacion;
        }
        this._cookieService.set('informacionPasajeros',JSON.stringify(vuelos));
        console.log(vuelos)
        if(tipo=='ida'){
          this._router.navigate(['/asientos/','ida'])
        }
        if(tipo=='vuelta'){
          this._router.navigate(['/asientos/','vuelta'])
        }
      }
    );
  }
}
