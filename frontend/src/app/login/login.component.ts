import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../api/models/Login';
import { LoginService } from '../api/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message!:string;
  isLogin=false;
  loginForm!: FormGroup;
  initForm():FormGroup{
    return this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4)]],
    });
  }
  constructor(private fb:FormBuilder, private api:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.initForm();
  }
  onSubmit():void{
    this.message='';
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      return;
    } 
    const login:Login = this.loginForm.value;
    login.email=login.email.toLowerCase();
    this.isLogin=true;
    this.api.authenticate(login).subscribe((res)=>{
      const msg=Object.values(res)[0];
      if(msg!='Ok'){
        this.message=msg;
      }else{
        sessionStorage.setItem('token',Object.values(res)[1]);
        this.router.navigate(['/']);
      }
      this.isLogin=false;
    });
  }

}
