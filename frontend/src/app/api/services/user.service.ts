import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string=environment.urlApi;
  constructor(private http:HttpClient) { }

  createUser(user:User):Observable<Object>{
    return this.http.post(this.apiUrl+'/Users',user);
  }
}
