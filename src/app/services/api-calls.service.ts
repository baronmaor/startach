import { Injectable} from '@angular/core';
import { Observable, Subject, throwError  } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import {TravelList} from '../interfaces/travel-list';


@Injectable({
  providedIn: 'root'
})

export class ApiCallsService {

  private travel = new Subject<any>();
  travelList:TravelList[]=[];
  countriesApiUrl:String='https://restcountries.eu';

  travelListObserver = new Observable((observer) => {//creating ne observe for the new travels booking
    observer.next(this.travelList);
  });

  constructor(private httpClient: HttpClient) { }

  getAllCountries=()=>{ //getting all countries from the API BASE_URL 
    return this.httpClient.get<any>(`${this.countriesApiUrl}/rest/v2/all`)
  }

  setTravelList=(data)=>{ // handling travel subscription request  
    let mockServerResponse = true; //mocking response from server

    if (mockServerResponse){
      data.bookingNumber = this.travelList.length+1; //incrimenting the position number of travel
      this.travelList.push(data);  //adding single travel object  to the travelList  array 
      this.travel.next(this.travelList); // sending update to the client 
      return 1;
    }
    else{
      throw("Server error")
    }
  }

  onNewTravel(): Observable<any> {
    return this.travel.asObservable();    //initiation the observe from client call 
  }
  


  
}
