import { Injectable } from '@angular/core';
import { CardItems } from '../common/card-items';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  caredItems:CardItems[] =[];
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();


  constructor() { }


  AddToCard(theCardItems:CardItems){
    let AlreadyExistsInCar:boolean =false;
    let ExistingInCar:CardItems|undefined;


    if(this.caredItems.length>0){
      ExistingInCar = this.caredItems.find(tempCartItems => tempCartItems.id=== theCardItems.id)
      
  AlreadyExistsInCar= (ExistingInCar !=undefined);
    }
    if (AlreadyExistsInCar && ExistingInCar?.quantity) {
      ExistingInCar.quantity++;
    }
   
  else{
    this.caredItems.push(theCardItems);
  }

  this.computerCardTotal();
  }
  computerCardTotal() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for(let currentCardItems of this.caredItems){
      totalPriceValue += currentCardItems.quantity*currentCardItems.unitePrice;
      totalQuantityValue += currentCardItems.quantity;
    }
    // publish the new value all subscribers will receiver the data 
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // lo car data  just debugging the purpose
    this.LogCardData(totalPriceValue,totalQuantityValue);
  }
  LogCardData(totalPriceValue: number, totalQuantityValue: number) {
     console.log(`Content of Card`);
      for(let tempCaredItem of this.caredItems){
        const subTotalPrice = tempCaredItem.quantity*tempCaredItem.unitePrice;
        console.log(`name=${tempCaredItem.name}, price= ${tempCaredItem.unitePrice}, quantity${tempCaredItem.quantity},total price${subTotalPrice}`)
      }
      console.log(`totalPrice=${totalPriceValue.toFixed(2)} totalQuantity=${totalQuantityValue}`)
      console.log('_________')
    }

    DecrementQuantity(thecareItems: CardItems) {
      thecareItems.quantity--;
      if(thecareItems.quantity===0){
        this.remove(thecareItems);
      } else{ 
      this.computerCardTotal();
    }
    }
      remove(thecareItems: CardItems) {
        const itemsIndex = this.caredItems.findIndex( data => data.id===thecareItems.id);
        if(itemsIndex > -1){
          this.caredItems.splice(itemsIndex,1);
          
          this.computerCardTotal();
        }
      }

 
}
