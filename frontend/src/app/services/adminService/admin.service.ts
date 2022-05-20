import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Bool } from 'src/app/product';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = 'api/isAdmin';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getAdminState(): Observable<boolean[]>{
      return this.http.get<boolean[]>(this.adminUrl)
      .pipe(
        tap(_ => this.log('fetched adminState')),
        catchError(this.handleError<boolean[]>('getAdminState'))
      );
    }

    adminToggle(isAdmin: boolean[]): Observable<any> {
      return this.http.post(this.adminUrl, isAdmin, this.httpOptions).pipe(
        tap(_ => this.log(`updated Admin state = ${isAdmin}`)),
        catchError(this.handleError<any>('adminToggle'))
      );
    }

    // Message Log stuff

    private log(message: string) {
      this.messageService.add(`AdminService: ${message}`);
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
