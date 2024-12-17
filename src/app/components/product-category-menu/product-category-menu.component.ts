import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategory:ProductCategory[]=[];  
  constructor( private productService:ProductService){

  }
  ngOnInit(){
  this.getProductCategory();
  }
  getProductCategory() {
    this.productService.getProductCategories().subscribe(
      data =>{
        console.log("Product Categories="+JSON.stringify(data))
        this.productCategory=data;

      }
    )
  }


}
