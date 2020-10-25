import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpEventType,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  countriesApiUrl:String='https://restcountries.eu';

  constructor(private httpClient: HttpClient) { }

  getAllCountries=()=>{
    return this.httpClient.get<any>(`${this.countriesApiUrl}/rest/v2/all`);
  }
}
