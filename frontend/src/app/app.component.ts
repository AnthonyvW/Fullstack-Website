import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AdminService } from './services/adminService/admin.service';
import { Bool } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  
  title = 'OSHA Uncertified';

  public constructor(private titleService: Title, private adminService: AdminService) { 
    this.setTitle(this.title)
  }
  // Sets the title of the page
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.getAdminState();
  }

  getAdminState(): void{
    this.adminService.getAdminState()
    .subscribe(isAdmin => this.isAdmin = isAdmin[0]);
  }
  goBack(): void{
    console.log(this.isAdmin)
  }
  toggleAdminState(): void {
    this.isAdmin = !this.isAdmin;
    this.adminService.adminToggle([!this.isAdmin]).subscribe(() => this.goBack());
  }
}
