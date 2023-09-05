
export class BusquedaVuelo {
  origen: string;
  destino: string;
  fechaIda: Date;
  cantAdult: number;
  cantNino: number;
  cantInfante: number;
  Precio: number;
  Distancia : number;
}

export class BusquedaVueloTwoSteps  extends BusquedaVuelo{
  fechaVuelta: Date;


}
