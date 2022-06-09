import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  constructor(
    private productService: ProductService,) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.cart = this.productService.getCart();
  }
  clearCart(){
    this.productService.clearCart()
  }
  deleteItem(id:number){
    this.productService.deleteProductFromCart(id)
  }
  modItem(product: Product, val:number){
    console.log("Product:", product)
    this.productService.modifyCart(+(product.id), +(val))
  }
  addToCart(value: Product): void{
    this.productService.addToCart(value);
  }

  getTotalSum(){
    let sum = 0;
    this.cart.map(val=>{
      sum += val.price * val.stock
    })
    return sum
  }
  getFixed(value: number){return value.toFixed(2)}
}
