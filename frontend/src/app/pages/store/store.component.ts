import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/DBProductService/DBProduct.service';

import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/productService/product.service';
import { AdminService } from 'src/app/services/adminService/admin.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{
  products: Product[] = [];
  isAdmin: boolean = this.getAdminState();

  constructor(
    private productService: ProductService, 
    private adminService: AdminService,
    private userService: UserService
  ) {   }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getAdminState(): boolean{
    this.isAdmin = this.adminService.isAdmin;
    return this.isAdmin;
  }

  getAdminVisibility(): string{
    if (this.isAdmin) return "true";
    return "false";
  }

  getProducts(): void{
    this.userService.getProducts().subscribe(products => {
      this.products = products
    });
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    
    this.userService.deleteProduct(product).subscribe();
  }

  add(product_name: string, cost: string, product_description: string): void{
    product_name = product_name.trim();
    let price: number = +cost;
    let id:number = 0;
    if (!product_name || !price) {return;}
    
    this.userService.addProduct({ id, product_name, price, product_description } as Product)
    .subscribe(product => {
      this.products.push(product)
    });
    
  }

  showStock(value: Product){
    if(value.stock <= 0) return true
    return false
  }

  addToCart(value: Product): void{
    this.productService.addToCart(value);
  }

  
}
