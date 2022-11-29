import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Biodigester,Rol,User } from 'src/app/api/models';
import { BiodigesterService, RolService } from 'src/app/api/services';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UserService } from 'src/app/api/services/user.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegister!:FormGroup;
  roles!:Rol[];
  biodigestors!:Biodigester[];
  biodigestorsAssigned:Biodigester[]=[];
  bioSelected=0;
  creatingUser=false;

  initForm():FormGroup{
    return this.fb.group({
      idEmail: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      name: ['',Validators.required],
      idRol:['',Validators.required],
    });
  }
  constructor(
    private fb:FormBuilder,
    private rolService:RolService,
    private bioService: BiodigesterService,
    private userService:UserService,
    faLibrary:FaIconLibrary
    ) {
      faLibrary.addIconPacks(fas);
     }

  ngOnInit(): void {
    this.formRegister=this.initForm();
    this.rolService.getRoles().subscribe(res=>{
      this.roles=res;
    });
    this.bioService.getBiodigestors().subscribe(res=>{
      this.biodigestors=res;
    });
  }
  onDeleteBiodigesterAssign(i:number){
    this.biodigestors.push(this.biodigestorsAssigned[i]);
    this.biodigestorsAssigned.splice(i,1);
  }
  changebioSelect(event:Event):void{
    this.bioSelected = (event.target as HTMLSelectElement).selectedIndex;;
  }
  onAddBiodigester():void{
    this.biodigestorsAssigned.push(this.biodigestors[this.bioSelected]);
    this.biodigestors.splice(this.bioSelected,1);
    console.log(this.biodigestorsAssigned);     
  }

  onSubmit(): void {
    if(!this.formRegister.valid){
      this.formRegister.markAllAsTouched();
      return;
    }
    this.creatingUser=true;
    const user:User = this.formRegister.value;
    this.userService.createUser(user).subscribe(res=>{
      let icon:SweetAlertIcon = 'question';
      if(Object.values(res)[0]=="Success"){
        icon='success';
        this.formRegister.reset();
      }else{
        icon='error';
      }
      Swal.fire({
        icon: icon,
        text: Object.values(res)[1]
      });
      this.creatingUser=false;
    });
    
  }

}
