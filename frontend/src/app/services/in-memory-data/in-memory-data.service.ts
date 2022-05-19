import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from 'src/app/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {id: 1, name: 'Wobbly Ladder', price: 19.99, description: "This is a wobbly ladder."},
      {id: 2, name: 'Slippery Boots', price: 19.99, description: "This is a pair of slippery boots."},
      {id: 3, name: 'Conductive Gloves', price: 19.99, description: "This is a pair of conductive gloves."},
      {id: 4, name: 'Open Toed Shoes', price: 10.00, description: "This is a pair of open toed shoes."}
  ];
    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genId(PRODUCT: Product[]): number {
    return PRODUCT.length > 0 ? Math.max(...PRODUCT.map(product => product.id)) + 1 : 11;
  }
}