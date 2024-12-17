import { CardService } from './../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { CardItems } from '../../common/card-items';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {




  CareItems:CardItems [] =[];
  totalPrice!:number;
  totalQuantity!:number;

  constructor(private CardService:CardService){

  }

  ngOnInit(): void {
    this.ListeCareDetails();
  }
  ListeCareDetails() {
    this.CareItems =this.CardService.caredItems;
    this.CardService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data
      }
    )

    this.CardService.totalQuantity.subscribe(
      data =>{
        this.totalQuantity=data
      }
    )
    this.CardService.computerCardTotal();
  }
IncrementQuantity(careItems: CardItems) {
  this.CardService.AddToCard(careItems);
}
DecrementQuantity(thecareItems: CardItems) {
  this.CardService.DecrementQuantity(thecareItems);
}
remove(careItems: CardItems) {
  this.CardService.remove(careItems);
  }
}