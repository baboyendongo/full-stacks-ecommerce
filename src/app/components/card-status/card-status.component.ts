import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrl: './card-status.component.css'
})
export class CardStatusComponent implements OnInit {

  totalPrice:number=0.00;
  totalQuantity:number=0;
  constructor( private cardServices:CardService){

  }
  ngOnInit(): void {
    this.updateCardItems();
    }
  updateCardItems() {

    this.cardServices.totalPrice.subscribe(
      data =>{
        this.totalPrice=data;
      }
    )

    this.cardServices.totalQuantity.subscribe(
      data =>{
        this.totalQuantity=data
      }
    )
    }

}
