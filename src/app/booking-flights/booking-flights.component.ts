import { Component, OnInit,OnDestroy, ViewChild  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiCallsService} from '../services/api-calls.service';
import {CountryType} from '../interfaces/country-type'
import {TravelList} from '../interfaces/travel-list'
import { Subscription } from 'rxjs';
import {MatTable} from '@angular/material/table';



@Component({
  selector: 'app-booking-flights',
  templateUrl: './booking-flights.component.html',
  styleUrls: ['./booking-flights.component.scss']
})


export class BookingFlightsComponent implements OnInit,OnDestroy {

  @ViewChild(MatTable) travelTable:MatTable<any>;
  TRAVEL_DATA: TravelList[]=[];
  ErrorObj = {
    msg:"",
    isSubmitBtnDisable:false
  }
  subscription: Subscription;
  FlightBooking;
  minDateFrom=new Date();
  minDateTo;


 
  aCountries:CountryType[]=[];
  displayedColumns: string[] = ['position', 'country', 'from', 'to'];
  dataSource = this.TRAVEL_DATA;

  constructor(private apicall:ApiCallsService) { 
    //getting countries from API call 
    
    this.apicall.getAllCountries().subscribe(data=>{ 
      this.aCountries =  data;
    },error=>{
      this.ErrorObj.isSubmitBtnDisable = true; //updating err obj btn
      this.ErrorObj.msg = "Unable to fetch countries list from server"; //updating err obj msg
      
      this.FlightBooking.disable(); // disabling any input from user 
    })


    // initiating observable and start listening 
    this.subscription = this.apicall.onNewTravel().subscribe(travel => { 
          this.dataSource=travel;
          this.travelTable.renderRows();
    });
  }


  ngOnInit(): void {
    this.createFormControls() // init form 
  }

// setting value for cheker date 
  onStartDateChange(){
    this.minDateTo = new Date(this.f.bookingDateFrom.value);
  }

  createFormControls(){
    this.FlightBooking = new FormGroup({
      bookingCountry:new FormControl('',[Validators.required]),
      bookingDateFrom:new FormControl('',[Validators.required]),
      bookingDateTo:new FormControl('',[Validators.required]),
      bookingNotes:new FormControl({value:"",disabled:false})
  
    })
  }

  //add single travel onbtnclick
    addTravel(){ 
      if(this.ErrorObj.isSubmitBtnDisable || this.FlightBooking.invalid){
        return;
      }
    const data = {
      bookingCountry:this.f.bookingCountry.value,
      bookingDateFrom:this.f.bookingDateFrom.value,
      bookingDateTo:this.f.bookingDateTo.value,
      bookingNotes:this.f.bookingNotes.value
    }
    try {
      this.apicall.setTravelList(data)
    } catch (error) {
      this.ErrorObj.isSubmitBtnDisable = true; //updating err obj btn
      this.ErrorObj.msg = error; //updating err obj msg
    }
    this.createFormControls();//reseting the form 
  }

  get f() { return this.FlightBooking.controls}

  ngOnDestroy() {
    this.subscription.unsubscribe(); // memory leaks handle 
}
test(){
  console.log(this.f.bookingCountry)
}
}
