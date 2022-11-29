import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { Login } from '../models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlApi:string=environment.urlApi;

  constructor(private http:HttpClient) { }

  authenticate(login:Login):Observable<Object>{
    return this.http.post(this.urlApi+'/Login',login);
  }


}
