import { API_URL } from './../env';
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { BusquedaVuelo } from '../shared/models/vuelo.model';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  constructor(private http : HttpClient) { }

  private static _handleError(err:HttpErrorResponse | any){
    return throwError((err.message || 'Server Error'))

  }

  buscarVuelos(form:any): Observable<any> {
    let headers=new HttpHeaders().set('Content-Type','application/json');
    // console.log(form);
    return this.http.post(API_URL+'/consulta-vuelo',form, {headers:headers, withCredentials:true});
  }
  getVuelo(info:string): Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    // console.log(form);
    return this.http.get(API_URL+'/vuelos/'+info, {headers:headers, withCredentials:true});
  }
}
