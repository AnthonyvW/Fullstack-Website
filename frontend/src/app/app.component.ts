import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AdminService } from './services/adminService/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'OSHA Uncertified';

  public constructor(private titleService: Title, private adminService: AdminService) { 
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
    //this.adminService.getAdminState().subscribe(isAdmin => this.isAdmin = isAdmin[0]);
  }
  
  toggleAdminState(): void {
    this.adminService.adminToggle();
    //this.isAdmin = !this.isAdmin;
    //this.adminService.adminToggle([!this.isAdmin]).subscribe(() => this.goBack());
  }

  goBack(): void{
    //console.log(this.isAdmin)
  }
}
