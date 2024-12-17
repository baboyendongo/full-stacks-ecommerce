import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit{


  constructor( private routes:Router){

  }
  ngOnInit(): void {
  }
  DoSearch( value:string) {
    console.log(`value${value}`);
    this.routes.navigateByUrl(`/search/${value}`);

  }


}
