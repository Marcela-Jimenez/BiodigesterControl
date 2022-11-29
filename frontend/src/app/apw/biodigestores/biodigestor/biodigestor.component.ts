import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Biodigester, BiodigesterRead } from 'src/app/api/models';
import { BiodigesterService } from 'src/app/api/services';
import { NgForm } from '@angular/forms'
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { multi } from './data';

@Component({
  selector: 'app-biodigestor',
  templateUrl: './biodigestor.component.html',
  styleUrls: ['./biodigestor.component.css']
})
export class BiodigestorComponent implements OnInit {

  multi: any[];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;


  savingChanges:boolean=false;
  biodigesterRead: BiodigesterRead = {
    id_bio: 0,
    date_read: Date.now(),
    air_quality: 0,
    carbon_monoxide: 0,
    gas: 0,
    humidety: 0,
    temperature: 0
  };

  biodigester: Biodigester={
    id:0,
    idToken:'',
    derivativeTime:0,
    fan:false,
    integralTime:0,
    light:false,
    proportionalGain:0,
    state:false,
    tempPoint:0,
    uAgriEnvironmental:''
  };

  constructor(private biodigesterService: BiodigesterService) {
    this.multi=multi;
   }

  ngOnInit(): void {
    this.biodigesterService.getBiodigesterById(1).subscribe(res => {
      this.biodigester = res;
    });
  }
  rangeSlide(event: Event) {
    this.biodigester.tempPoint = Number((event.target as HTMLInputElement).value);
  }
  startOrStop(){
    this.biodigester.state=!this.biodigester.state;
  }
  saveChanges(): void {
    this.savingChanges=true;
    this.biodigesterService.actualizarBiodigestor(1,this.biodigester).subscribe(res=>{
      let icon:SweetAlertIcon;
      if(Object.values(res)[0]=='Successful'){
        icon='success';
      }else{
        icon='error';
      }
      Swal.fire({
        icon: icon,
        title: Object.values(res)[0]
      });
      this.savingChanges=false;
    });
  }

}