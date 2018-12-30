import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-fotografia',
  templateUrl: './fotografia.component.html',
  styleUrls: ['./fotografia.component.css']
})
export class FotografiaComponent implements OnInit {
  public url:string;

  @Input() fotografia:any;
  @Input() seleccionada:any;

  constructor() { 
    this.url=GLOBAL.url;
  }

  ngOnInit() {
  }

}
