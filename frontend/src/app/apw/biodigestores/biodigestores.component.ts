import { Component, OnInit } from '@angular/core';
import { Biodigester } from 'src/app/api/models';
import { BiodigesterService } from 'src/app/api/services';
import Swal from 'sweetalert2';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-biodigestores',
  templateUrl: './biodigestores.component.html',
  styleUrls: ['./biodigestores.component.css']
})
export class BiodigestoresComponent implements OnInit {

  biodigesters!: Biodigester[];

  constructor(
    private biodigesterService: BiodigesterService,
    library:FaIconLibrary
  ) {
    library.addIconPacks(fas);
   }

  ngOnInit(): void {
    this.updateBiodigester();
  }
  updateBiodigester(): void {
    //obtener biodigestores por idRol
    this.biodigesterService.getBiodigestors().subscribe(res => {
      this.biodigesters = res;
    });
  }
  addBiodigester(): void {
    const sedeName = (document.getElementById("sedeName") as HTMLInputElement).value

    const biodigester: Biodigester = {
      uAgriEnvironmental: sedeName,
      derivativeTime: 0,
      fan: false,
      idToken: this.generateToken(),
      id: 0,
      integralTime: 0,
      light: false,
      proportionalGain: 0,
      state: false,
      tempPoint: 0
    }
    this.biodigesterService.addBiodigester(biodigester).subscribe(
      res => {
        if (Object.values(res)[0] == "Success") {
          this.updateBiodigester();
          Swal.fire({
            icon: 'success',
            title: 'Biodigestor agregado correctamente'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se logro agregar el biodigestor'
          })
        }
      });

  }

  generateToken(): string {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const cadena = letras + numbers;
    let salida = "";
    for (let i = 0; i < 12; i++) {
      let random = Math.abs(Math.random() * cadena.length);
      salida += cadena.charAt(random);
    }
    return salida;
  }

}
