import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiCallsService} from '../services/api-calls.service';
import {CountryType} from '../interfaces/country-type'

@Component({
  selector: 'app-booking-flights',
  templateUrl: './booking-flights.component.html',
  styleUrls: ['./booking-flights.component.scss']
})
export class BookingFlightsComponent implements OnInit {
  FlightBooking = new FormGroup({
    bookingCountry:new FormControl(''),
    bookingDateFrom:new FormControl(''),
    bookingDateTo:new FormControl(''),
    bookingNotes:new FormControl('')

  })
  aCountries:CountryType[]=[{name:"aaa"},{name:"bbb"}];

  constructor(private apicall:ApiCallsService) { 
    // this.apicall.getAllCountries().subscribe(data=>{// initiating first call for countries API 
    //   this.aCountries =  data;
    // })
  }

  ngOnInit(): void {
   
  }

  test(){
    console.log(this.f)
  }


  get f() { return this.FlightBooking.controls}

}
