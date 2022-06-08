import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AdminService } from './services/adminService/admin.service';
import { ProductService } from './services/productService/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'OSHA Uncertified';

  public constructor(
    private titleService: Title,
    private productService: ProductService,  
    private adminService: AdminService) { 
    this.setTitle(this.title)
  }

  // Sets the title of the page
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
  }

  getAdminState(): boolean{
    return this.adminService.isAdmin;
  }
  
  toggleAdminState(): void {
    this.adminService.adminToggle();
  }

  goBack(): void{
  }
  getCartSize(){
    return this.productService.getCartSize()
    
  }
}
