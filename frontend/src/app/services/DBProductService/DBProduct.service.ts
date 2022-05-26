import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Product } from 'src/app/product'

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {   }

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
}
