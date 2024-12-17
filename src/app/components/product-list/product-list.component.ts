import { CardService } from './../../services/card.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CardItems } from '../../common/card-items';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  SearchMode:boolean=false;
  previousCategoryId: number=1;
  theKeyword:string | undefined;

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  previousKeyword: string | undefined;
  
  // theTotalPage:number =0;:
 

  constructor(private productService: ProductService,private cardService:CardService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
   this.SearchMode= this.route.snapshot.paramMap.has('keyword');

   if(this.SearchMode){
    this.HandleSearchListProducts();
   }else{ 
    this.HandleListProducts();
    }
  }
  HandleSearchListProducts() {
    
    const theKeyword:string = this.route.snapshot.paramMap.get('keyword')!;
    if(this.previousKeyword= this.theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword =${theKeyword}, thePageNumber${this.thePageNumber} `)
    this.productService.SearchProductsPagination(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      this.ProcessResultat());
    }
  
 
  HandleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber =1;
    }
    this.previousCategoryId =this.currentCategoryId;
    console.log(`currentcategoryId = ${this.currentCategoryId}, thePage number ${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductsListPagination(this.thePageNumber - 1,this.thePageSize,this.currentCategoryId).subscribe(
      this.ProcessResultat()
    );   
  } 
  updatePageSize(pageSize: string) {
    this.thePageSize= +pageSize;
    this.thePageNumber=1;
    this.listProducts();
}
ProcessResultat() {
    return (data:any)=>{
      this.products = data._embedded.products;
        this.thePageNumber=data.page.number + 1;
        this.thePageSize=data.page.size;
        this.theTotalElements=data.page.totalElements; 
        

    }    
}
AddToCar(theProducts: Product) {
  console.log(`Adding to Cart: ${theProducts.name},${theProducts.unit_price}`);
  const thecareItems = new CardItems(theProducts);
  this.cardService.AddToCard(thecareItems);
  }

} 
