import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from '../model/Passenger';
import { Ticket } from '../model/Ticket';
import { Train } from '../model/Train';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
import { TrainService } from '../services/train.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  user : any;
  train : any;
  trainNo : number;
  passengers : Array<Passenger>;
  add = false;
  passengerForm : FormGroup;
  passengername : FormControl;
  age : FormControl;
  gender : FormControl;
  ticket : Ticket;
  returedTicket : any;
  isTicketGenerated = false;
  constructor(private activatedRoute : ActivatedRoute, 
    private trainService : TrainService, 
    private ticketService : TicketService,
    private auth : AuthService
    ) { 
    this.trainNo = this.activatedRoute.snapshot.params["trainNo"];
    this.passengers = [];
  }

  ngOnInit(): void {
    this.trainService.getTrainById(this.trainNo).subscribe(
      data => {this.train = data, console.log(this.train)},
      error => {console.log("Train is not present")}); 

      this.auth.getUser().subscribe(
        data => {this.user = data, console.log(this.user)},
        error => {console.log("User is not present")}
      );

      this.passengername = new FormControl('',[Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
      this.age = new FormControl('', [Validators.required]);
      this.gender = new FormControl('', Validators.required);
  
      this.passengerForm =  new FormGroup({
        passengername : this.passengername,
        age :this.age,
        gender : this.gender
      });
  }

  public noWhitespaceValidator(control: FormControl) {
    const val = control.value;
    const isWhitespace = (control.value || '').trim().length < val.length;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  addPassenger() {
    var passenger : Passenger = {
      passengerId : null,
      passengerName : this.passengerForm.get("passengername").value,
      age : this.passengerForm.get("age").value,
      gender : this.passengerForm.get("gender").value,
      status : null
    }
    console.log(passenger);
    this.passengers.push(passenger);
    this.add = false;
  }

  delete(name : string){
    for(var i=0;i<this.passengers.length;i++) {
      if(this.passengers[i].passengerName === name) {
        this.passengers.splice(i,1);
        break;
      }
    }
  }

  changeAdd() {
    this.add = !this.add;
  }

  cancel() {
    this.add = false;
  }

  bookTicket() {
    this.isTicketGenerated = true;
    this.ticket = {
      pnrNo : null,
      userEmail : this.user.email,
      passengers : this.passengers,
      train : this.train
    }

    this.ticketService.bookTicket(this.ticket).subscribe(
      data => {this.returedTicket = data, console.log(this.returedTicket)},
      error=> {console.log("Ticket can't be added")}
    );
  }

}
