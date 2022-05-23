import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Product } from 'src/app/product';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productsUrl = 'api/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
    }

    getProduct(id: number): Observable<Product>{
      const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
    }

    addProduct(product: Product): Observable<Product>{
      return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
        tap((newProduct: Product) => this.log(`Added Product w/ id=${newProduct.id}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
    }

    deleteProduct(id: number): Observable<Product> {
      const url = `${this.productsUrl}/${id}`;
  
      return this.http.delete<Product>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted product id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
    }



    private log(message: string) {
      this.messageService.add(`ProductService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
