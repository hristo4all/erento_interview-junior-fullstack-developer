import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  baseURL: string = "http://localhost:3000/";
  constructor(private httpClient: HttpClient) { }

  getSearchResult(searchString: string){
    // add the search string to the request
    //searchString = "test";
    console.log(searchString.toLocaleLowerCase());
    const safeSearchString = encodeURIComponent(searchString.toLocaleLowerCase());

    return this.httpClient.get(this.baseURL + 'city/' + 'search?q='+ safeSearchString);
  }
}
