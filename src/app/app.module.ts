import { FormulariosModule } from './formularios/formularios.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

//Librerias
import { SeatsioAngularModule } from '@seatsio/seatsio-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VuelosComponent } from './vuelos/vuelos.component';
import { VuelosService } from './services/vuelos.service';
import { RegistroComponent } from './registro/registro.component';
import { AsientosComponent } from './asientos/asientos.component';
import { PagoComponent } from './pago/pago.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule } from '@angular/forms';
import { ItinerarioComponent } from './itinerario/itinerario.component';
import { FormularioVueloV2Component } from './formulario-vuelo-v2/formulario-vuelo-v2.component';
import { SeleccionVueloComponent } from './seleccion-vuelo/seleccion-vuelo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    VuelosComponent,
    RegistroComponent,
    AsientosComponent,
    PagoComponent,
    ItinerarioComponent,
    FormularioVueloV2Component,
    SeleccionVueloComponent

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormulariosModule,
    FontAwesomeModule,
    HttpClientModule,
    SeatsioAngularModule,
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [VuelosService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
