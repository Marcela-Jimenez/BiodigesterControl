import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Biodigester} from '../models';

@Injectable({
  providedIn: 'root'
})
export class BiodigesterService {

  apiUrl:string=environment.urlApi;
  constructor(private http:HttpClient) { }

  getBiodigestors(): Observable<Biodigester[]>{
    return this.http.get<Biodigester[]>(this.apiUrl+'/biodigester');
  }

  getBiodigesterById(id:number): Observable<Biodigester>{
    return this.http.get<Biodigester>(this.apiUrl+'/biodigester/'+id);
  }
  actualizarBiodigestor(id:number, biodigester:Biodigester):Observable<Object>{
    return this.http.put(this.apiUrl+'/biodigester/'+id,biodigester);
  }
}
