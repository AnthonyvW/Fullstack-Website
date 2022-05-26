import { Component, OnInit } from '@angular/core';
import { catchError, of, switchMap, tap } from 'rxjs'
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
    private userService: UserService) { 

    
  }
  
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
    this.userService.getProducts().subscribe(products => this.products = products);
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    
    this.userService.deleteProduct(product).subscribe();
  }

  add(name: string, cost: string, description: string): void{
    name = name.trim();
    let price: number = +cost;
    let id:number = 0;
    console.log(name, price, description)
    if (!name || !price) {return;}
    this.userService.addProduct({ id, name, price, description } as Product).subscribe(product => {this.products.push(product)});
    
  }

  
}
