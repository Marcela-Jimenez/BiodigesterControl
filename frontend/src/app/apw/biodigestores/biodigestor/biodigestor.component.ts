import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Biodigester, BiodigesterRead } from 'src/app/api/models';
import { BiodigesterService } from 'src/app/api/services';
import { NgForm } from '@angular/forms';
import * as SignalR from '@microsoft/signalr';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-biodigestor',
  templateUrl: './biodigestor.component.html',
  styleUrls: ['./biodigestor.component.css']
})
export class BiodigestorComponent implements OnInit {

  
  biodigesterReadsPerSecond:BiodigesterRead[]=[];
  //Humedity
  relativeHumedity={};
  seriesHumedity:any[]=[];
  lastReadHumedity:number=0;
  //DecimalTemperature
  relativeTemperature:any=[];
  seriesTemperature:any[]=[];
  lastReadTemperature:number=0;
  //SetPoint
  seriesSetPoint:any[]=[];
  //AirQuality
  relativeAirQuality={};
  seriesAirQuality:any[]=[];
  lastReadAirQuality:number=0;
  //Gas
  relativeGas={};
  seriesGas:any[]=[];
  lastReadGas:number=0;
  //CO
  relativeCO={};
  seriesCO:any[]=[];
  lastReadCO:number=0;

  savingChanges:boolean=false;
  biodigesterRead: BiodigesterRead = {
    idBio: 0,
    dateRead: Date.now(),
    airQuality: 0,
    carbonMonoxid: 0,
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

  constructor(private biodigesterService: BiodigesterService) {}

  ngOnInit(): void {
    this.biodigesterService.getBiodigesterById(1).subscribe(res => {
      this.biodigester = res;
    });
    this.initSignalR();
    this.relativeHumedity={
      name: "Humedad",
      series: this.seriesHumedity
    };
    this.relativeTemperature.push({
      name: "Temperatura",
      series: this.seriesTemperature
    });
    this.relativeTemperature.push({
      name: "SetPoint",
      series: []
    });
    this.relativeAirQuality={
      name: "Calidad del Aire",
      series: this.seriesAirQuality
    };
    this.relativeGas={
      name: "Gas",
      series: this.seriesGas
    };
    this.relativeCO={
      name: "Monoxido de Carbono",
      series: this.seriesCO
    };
  }

  initSignalR():void{
    const connection = new SignalR.HubConnectionBuilder()
    .configureLogging(SignalR.LogLevel.Critical)
    .withUrl(environment.urlApi+'/hubReadBiodigester')
    .build();

    connection.start().then(() => {
      console.log('SignalR Connected!');
    }).catch(err=>{
      console.error('error->',err.toString());
    });

    connection.on("getReads", read=>{
      const bioRead:BiodigesterRead = read;
      this.biodigesterReadsPerSecond.push(bioRead);
      //humedity
      if(this.biodigesterReadsPerSecond.length>=60){
        this.seriesHumedity.shift();
        this.seriesTemperature.shift();
        this.seriesSetPoint.shift();
        this.seriesAirQuality.shift();
        this.seriesGas.shift();
        this.seriesCO.shift();
      }
      this.seriesHumedity.push({value:bioRead.humidety,name:this.biodigesterReadsPerSecond.length});
      this.relativeHumedity={
        name: "Humedad",
        series: this.seriesHumedity
      };
      this.lastReadHumedity=bioRead.humidety;

       //DecimalTemperature
      this.seriesTemperature.push({value:bioRead.temperature,name:this.biodigesterReadsPerSecond.length});
      this.seriesSetPoint.push({value:this.biodigester.tempPoint,name:this.biodigesterReadsPerSecond.length});
      this.relativeTemperature=[{
        name: "Temperatura Decimal",
        series: this.seriesTemperature
      },{
        name: "SetPoint",
        series: this.seriesSetPoint
      }];
      this.lastReadTemperature=bioRead.temperature;
      

      //AirQuality
      this.seriesAirQuality.push({value:bioRead.airQuality,name:this.biodigesterReadsPerSecond.length});
      this.relativeAirQuality={
        name: "Calidad del Aire",
        series: this.seriesAirQuality
      };
      this.lastReadAirQuality=bioRead.airQuality;

      //Gas
      this.seriesGas.push({value:bioRead.gas,name:this.biodigesterReadsPerSecond.length});
      this.relativeGas={
        name: "Gas",
        series: this.seriesGas
      };
      this.lastReadGas=bioRead.gas;

      //CO
      this.seriesCO.push({value:bioRead.carbonMonoxid,name:this.biodigesterReadsPerSecond.length});
      this.relativeCO={
        name: "Monoxido de Carbono",
        series: this.seriesCO
      };
      this.lastReadCO=bioRead.carbonMonoxid;
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