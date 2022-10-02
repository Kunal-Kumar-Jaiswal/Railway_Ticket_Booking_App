import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Train } from '../model/Train';
import { TrainService } from '../services/train.service';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  trainList : any;
  train : Train;
  constructor(private trainService : TrainService, private activatedRoute : ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.params['train']);
    console.log(this.train);
    this.train = {
      trainNo : null,
      from : this.activatedRoute.snapshot.params['from'],
      to : this.activatedRoute.snapshot.params['to'],
      date : this.activatedRoute.snapshot.params['date'],
      classes : null,
      category : null
    }
   }

  ngOnInit(): void {
    this.trainService.getTrains(this.train).subscribe(data => {this.trainList = data, console.log(this.trainList) },
    error => {console.log("Registration failed")});
    console.log(this.trainList)
  }

  book() {
    localStorage.setItem("from",this.train.from);
    localStorage.setItem("to",this.train.to);
    localStorage.setItem("date",this.train.date.toString());
  }

}
