import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = 'api/isAdmin';
  isAdmin: boolean = false;
  isAdminChange: Subject<boolean> = new Subject<boolean>();

  constructor() { 
      this.isAdminChange.subscribe((value) =>{this.isAdmin = value});
  }

  adminToggle(): void{
    this.isAdminChange.next(!this.isAdmin);
  }
}
