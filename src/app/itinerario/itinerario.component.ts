import { Component, OnInit } from '@angular/core';
import { BusquedaVuelo } from '../shared/models/vuelo.model';
import { CookieService } from 'ngx-cookie-service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { switchMap, map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})
export class ItinerarioComponent implements OnInit{
  
  constructor(private cookieService: CookieService, 
    private _vueloService: VuelosService,) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, this.customeEmailValidator]),
    telefono: new FormControl('', [Validators.required, this.customPhoneValidator]),
    nombre: new FormControl('', [Validators.required]), // Campo de nombre
    apellido: new FormControl('', [Validators.required]) // Campo de apellido
  });



  getError(control: any): string {
    if (control.errors?.required && control.touched) {
      return 'This field is required!';
    } else if (control.errors?.emailError && control.touched) {
      return 'Please enter a valid email address!';
    } else if (control.errors?.phoneError && control.touched) {
      return 'Please enter a valid phone number!';
    } else {
      return '';
    }
  }

  customeEmailValidator(control:AbstractControl) {
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
      const value = control.value;
      if(!pattern.test(value) && control.touched) 
        return {
          emailError:true
        }
      else return null;
  }

  customPhoneValidator(control: AbstractControl) {
    const phonePattern = /^\d{10}$/; // Adjust the pattern for your phone number format
    const value = control.value;
    if (!phonePattern.test(value) && control.touched) {
      return { phoneError: true };
    } else {
      return null;
    }
  }
  guardarInformacion() {
    if (this.form.valid) {
      
      let nombre = this.form.get('nombre')?.value;
      let apellido = this.form.get('apellido')?.value;
      let email = this.form.get('email')?.value;
      let telefono = this.form.get('telefono')?.value;
     
      let persona = nombre.concat(' ', apellido);
      const data = {
        nombre: persona,
        email: email,
        total: this.totalFinal,
      }
      const jsonData = JSON.stringify(data);
      this.cookieService.set('userData', jsonData);

      
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades.
    }
  }
  
  
  vuelo: any [] = [];
  data: any [];
  mayores: any [] = [];
  adultos: any [] =[];
  ninos: any [] =[];
  infantes: any;
  resumeVuelo: any[]= [];
  vuelos: any[] = [];
  precioBase: any;
  precioTotal: any;
  hacia:String;
  desde: String;

  asientos: any [] = [];
  datos: any [] = [];
  iva: number = 0;
  subtotal: number = 0;
  totalFinal: number = 0;

  

  ngOnInit(): void {

    this.data = [JSON.parse(this.cookieService.get('informacion'))];
    console.log(this.data)
    
    this.mayores = this.organizarArreglo(this.data, 'adultos_mayores');
    this.adultos = this.organizarArreglo(this.data, 'adultos');
    this.ninos = this.organizarArreglo(this.data, 'ninos');
    this.infantes = this.organizarArreglo(this.data, 'infantes');
    
    // guardamos los asientos
    this.resumeVuelo.push(this.mayores);
    this.resumeVuelo.push(this.adultos);
    this.resumeVuelo.push(this.ninos);
    this.resumeVuelo.push(this.infantes);

    this.data.forEach(async element => {
      // info para la tabla de asientos
      this.mayores = element.distribucion_asientos.adultos_mayores;
      this.adultos = element.distribucion_asientos.adultos;
      this.ninos = element.distribucion_asientos.ninos;
      this.infantes = element.distribucion_asientos.infantes;
      this.precioBase = parseFloat(element.precio_base).toFixed(2);
      this.precioTotal = parseFloat(element.precio_total).toFixed(2);
      let todos = element.asientos.length;
      let precioMayores = this.precioBase * 0.5 *this.mayores.length;
      let precioAdultos = this.precioBase * this.adultos.length;
      let precioNinos = this.precioBase * this.ninos.length;
      let precioInfantes = this.precioBase * 0;
      let idVuelo = element.vuelo_id;
      console.log(this.precioTotal)
      const vuelo = await this.llamarVuelo(idVuelo).toPromise();
      this.hacia = vuelo.lugar_destino_id.Ciudad;
      this.desde = vuelo.lugar_origen_id.Ciudad;
      let numVuelo = vuelo.numero_de_vuelo;
      let distancia = vuelo.distancia_KM;
      let clase = element.clase;
      let totalMaletas = 1;
      let fecha = vuelo.fecha;
      console.log(this.hacia);
      let asientos ={
          hacia: this.hacia,
          desde: this.desde,
          mayores: this.mayores,
          adultos: this.adultos,
          ninos: this.ninos,
          infantes: this.infantes,
          precio_base: this.precioBase,
          precioAdultos: precioAdultos,
          precioMayores: precioMayores,
          precioNinos: precioNinos,
          precioInfantes: precioInfantes,
      }

      //Informacion para resumen
      let resume = {
        hacia: this.hacia,
        desde: this.desde,
        numVuelo: numVuelo,
        fecha: fecha,
        distancia: distancia,
        totalMaletas: totalMaletas,
        precioTotal: this.precioTotal,
        clase: clase,
      }

      this.asientos.push(asientos);
      this.datos.push(resume);
      this.subtotal = this.subtotal + parseFloat(this.precioTotal);
      this.iva = parseFloat(this.precioTotal) * 0.12;
      this.totalFinal = this.subtotal + this.iva;
      
    });

    console.log(this.totalFinal);
       
  }
  organizarArreglo(infor: any[], name:string){
    this.vuelo = infor.map(item => item['vuelo_id']);
    return infor.map(item => item['distribucion_asientos'][name]);
  }

  llamarVuelo(vueloId: string) {
    return this._vueloService.getVuelo(vueloId).pipe(
      map((response) => {
        return response['Vuelo: ']; 
      })
    );
  }


  


}
