import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        //in real world app, we may send the server to some remote logging infrastructure
        //instead of just logging it to the console
        let erroMessage = '';
        if (err.error instanceof ErrorEvent) {
            //A client-side or network error occurred. Handle it accordingly
            erroMessage = `An error occured: ${err.error.message}`;
        } else {
            //The backend returned an unsuccefull response code.
            //The response body may contain clues as to what went wrong
            erroMessage = `Server returned code: ${err.status}, error message is; ${err.message}`;
        }
        console.error(erroMessage);
        return throwError(() =>erroMessage); 
    }
}