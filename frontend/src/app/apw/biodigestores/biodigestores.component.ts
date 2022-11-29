import { Component, OnInit } from '@angular/core';
import { Biodigester } from 'src/app/api/models';
import { BiodigesterService } from 'src/app/api/services';

@Component({
  selector: 'app-biodigestores',
  templateUrl: './biodigestores.component.html',
  styleUrls: ['./biodigestores.component.css']
})
export class BiodigestoresComponent implements OnInit {

  biodigesters!:Biodigester[];

  constructor(
    private biodigesterService:BiodigesterService
    ) { }

  ngOnInit(): void {
    //obtener biodigestores por idRol
    this.biodigesterService.getBiodigestors().subscribe(res=>{   
      this.biodigesters=res;     
    });
  }

}
