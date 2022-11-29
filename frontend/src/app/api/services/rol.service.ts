import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlApi=environment.urlApi;
  constructor(private http:HttpClient) { }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlApi+'/rol');
  }
}
