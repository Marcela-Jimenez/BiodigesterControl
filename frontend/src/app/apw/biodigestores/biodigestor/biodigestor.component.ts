import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biodigestor',
  templateUrl: './biodigestor.component.html',
  styleUrls: ['./biodigestor.component.css']
})
export class BiodigestorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  rangeSlide() {
    let myContainer = document.getElementById('inRange') as HTMLInputElement
    console.log('event->',myContainer.value);
    
    /*let myContainer = document.getElementById('inRange') as HTMLInputElement;
    myContainer.value = value;*/
}

}