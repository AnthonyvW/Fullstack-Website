import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/DBProductService/DBProduct.service';

import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: Product | undefined;
  temp : any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.getProduct(id)
      .subscribe(product => {
        this.product = product
      });
  }

  goBack(): void {
    this.location.back();
  }
  
  showStock(value: Product){
    if(value.stock <= 0) return true
    return false
  }
  addToCart(value: Product): void{
    this.productService.addToCart(value);
  }
  urlEncode(url: string) {
    return url.replace(/ /g, "_")
  }
}
