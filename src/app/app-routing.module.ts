import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioPasajeroComponent } from './formularios/formulario-pasajero/formulario-pasajero.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { AsientosComponent } from './asientos/asientos.component';
import { PagoComponent } from './pago/pago.component';
import { ItinerarioComponent } from './itinerario/itinerario.component';
import { SeleccionVueloComponent } from './seleccion-vuelo/seleccion-vuelo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'datos-pasajero/:id', component: FormularioPasajeroComponent },
  { path: 'asientos/:tipo', component: AsientosComponent },
  { path: 'vuelos/:tipo', component: SeleccionVueloComponent },
  { path: 'pago', component: PagoComponent },
  {path: 'itinerario', component: ItinerarioComponent},




  //{path: '', redirectTo:'home'},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
