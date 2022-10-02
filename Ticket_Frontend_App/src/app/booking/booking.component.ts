import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Train } from '../model/Train';
import { RouterService } from '../services/router.service';
import { TrainService } from '../services/train.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  search : FormGroup;
  from : FormControl;
  to : FormControl;
  date : FormControl;
  class : FormControl;
  category : FormControl;
  sources : any;
  destinations : any;
  classes : Array<String> = ["All Classes","Second Sitting (2S)", "Sleeper (SL)", "Chair Car (CC)", "AC 1 Tier (1A)", "AC 2 Tier (2A)", "AC 3 Tier (3A)" ];
  categories : Array<String> = ["General" , "Ladies", "Senior Citizen", "Person with Disability", "Tatkal", "Premium Tatkal"];
  train : Train;
  trainList : any
  constructor(private trainService : TrainService, private route : RouterService) { }

  ngOnInit(): void {
    this.trainService.getFroms().subscribe(
      data => {this.sources = data},
      error => {console.log("Error in fetching sources");}
    )

    this.trainService.getDestinations().subscribe(
      data => {this.destinations = data},
      error => {console.log("Error in fetching destinations");}
    )

    this.from = new FormControl("", Validators.required);
    this.to = new FormControl("", Validators.required);
    this.date = new FormControl(new Date(), Validators.required);
    this.class = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    
    this.search =  new FormGroup({
      from : this.from,
      to : this.to,
      date : this.date,
      class : this.class,
      category : this.category
    });
  }

  trains() {
    if(this.search.get("from").value === this.search.get("to").value) {
      alert("From and to should not be same");
    }
    this.train = {
      trainNo : null,
      from : this.search.get("from").value,
      to : this.search.get("to").value,
      date : this.search.get("date").value,
      classes : this.search.get("class").value,
      category : this.search.get("category").value
    }
    var from = this.search.get("from").value;
    var to = this.search.get("to").value;
    var date = this.search.get("date").value
    console.log(this.train);
    this.route.routeToTrains(from,to,date.toString());
    // this.trainService.getTrains(this.train).subscribe(data => {this.trainList = data, console.log(this.trainList) },
    // error => {console.log("Registration failed")});
  }

}
