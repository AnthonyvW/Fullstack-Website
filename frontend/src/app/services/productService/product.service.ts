import { Injectable,OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Product } from 'src/app/product';
import { UserService } from '../DBProductService/DBProduct.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  cart: Product[] = [];

  constructor(private userService: UserService) { 
  }
    ngOnInit(){
      let temp = (localStorage.getItem("cart") || '').toString()
      if(temp !== ''){
        this.cart = JSON.parse(temp)
      }
    }

    addToCart(product: Product){
      let bool = false
      let stock = 0
      console.log(product)
      this.cart.filter(function(obj){
        console.log(obj)
        if((obj.id == product.id) && (+(obj.stock) < +(product.stock))){
          bool = true
          obj.stock = (+(obj.stock)) + 1
          stock = obj.stock
          return obj
        }else if(obj.id == product.id){
          bool = true
        }
        return obj
      })
      if(!bool){
        let copy = Object.assign({}, product)
        copy.stock = 1
        stock = 1
        this.cart.push(copy)
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      return stock;
    }

    modifyCart(id:number, value:number){
      this.cart.map(val=>{
        if(val.id == id){
          if(val.stock + value >= 0)
          val.stock += value
        }
      })
      this.cart = this.cart.filter(function(obj){
        return obj.stock > 0;
      })
    localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    deleteProductFromCart(id: number) {
      this.cart = this.cart.filter(function( obj ) {
        if (obj.id == id && obj.stock > 1){
          obj.stock -= 1
          return obj
        } 
        return obj.id !== id;
    })
    localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  
    getCart() {
      let temp = (localStorage.getItem("cart") || '').toString()
      if(temp !== ''){
        this.cart = JSON.parse(temp)
      }
      return this.cart
    }
    getCartSize() {
      let temp = (localStorage.getItem("cart") || '').toString()
      if(temp !== ''){
        this.cart = JSON.parse(temp)
      }
      let cartsize=0;
      this.cart.forEach(obj=>{
        cartsize += obj.stock
      })
      return cartsize
    }
    clearCart(){
      this.cart.forEach(obj=>{
        this.userService.changeStock(obj).subscribe(result=>{console.log(result)})
      })
      this.cart = []
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }


}
