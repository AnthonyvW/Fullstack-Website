import { Component, OnInit } from '@angular/core';


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
  
  constructor(private productService: ProductService, private adminService: AdminService) { }
  
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
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }

  add(name: string, cost: string, description: string): void{
    name = name.trim();
    let price: number = +cost;
    let id:number = 0; // TODO replace with real id
    if (!name || !price) {return;}
    this.productService.addProduct({ id, name, price, description } as Product).subscribe(product => {this.products.push(product)});
  }

  
}
