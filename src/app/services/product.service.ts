import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 

  private baseUrl ="http://localhost:8080/api/products";
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor( private httpClient:HttpClient) { 

  }

   getProductsList(theCategorieId:number):Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategorieId}`;
    return this.getProducts(searchUrl)
   }
   getProductsListPagination(thePage:number,thePageSize:number,theCategorieId:number):Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategorieId}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
   } 
   SearchProductsPagination(thePage:number,thePageSize:number,thekeyword:string):Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
   } 

getProductCategories(): Observable<ProductCategory[]> {
  return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.productCategory)
  );
}

searchProducts(theKeyword: string) {
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl)
}


  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(reponse => reponse._embedded.products)
    );
  }
   getProduct(theProductId: number):Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl)

  }
}

interface GetResponseProducts {
_embedded: {
  products: Product[];
}
page:{
  size:number,
  totalElements:number,
  totalPages:number,
  number:number
}
}

interface GetResponseProductCategory {
_embedded: {
  productCategory: ProductCategory[];
}
}
