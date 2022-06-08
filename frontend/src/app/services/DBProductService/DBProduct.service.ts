import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Product } from 'src/app/product'

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
interface User {
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http: HttpClient) {   }

  getUsers(){
    const url = `http://localhost:3000/users/`
    return this._http.get<User[]>(url, options)
  }

  addProduct(product: Product){
    const url = `http://localhost:3000/shop/`
    return this._http.post<Product>(url, product, options)
  }

  deleteProduct(product: Product){
    const url = `http://localhost:3000/shop/${product.id}/`

    return this._http.delete<number>(url, options)
  }

  getProduct(productID: number){
    const url = `http://localhost:3000/shop/${productID}/`

    return this._http.get<Product>(url, options)
  }

  getProducts(){
    const url = `http://localhost:3000/shop/`

    return this._http.get<Product[]>(url, options)
  }
  changeStock(product: Product){
    const url = `http://localhost:3000/cart/`
    
    return this._http.put<Product>(url, product, options)
  }
}
