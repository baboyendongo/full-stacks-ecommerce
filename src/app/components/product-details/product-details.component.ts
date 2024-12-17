import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { CardItems } from '../../common/card-items';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  product!: Product;

  constructor( private productService:ProductService,private cardService:CardService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      data =>{
        this.handleProductDetails();
      }
    )
  }
  handleProductDetails() {

   const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

   this.productService.getProduct(theProductId).subscribe(
    data =>{
      this.product=data;
    }
   )
  }
  addToCar() {
    console.log(`Adding to Card =${this.product?.name},${this.product?.unit_price}`);
    const theCardItem = new CardItems(this.product);
    this.cardService.AddToCard(theCardItem);
  }

}
