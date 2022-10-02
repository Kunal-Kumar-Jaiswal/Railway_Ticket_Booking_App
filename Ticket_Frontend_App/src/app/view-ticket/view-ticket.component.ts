import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Passenger } from '../model/Passenger';
import { RouterService } from '../services/router.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  tickets : any;
  isEditMode = false;
  passenger : Passenger;
  editPassenger : FormGroup;
  passengername : FormControl;
  age : FormControl;
  gender : FormControl;
  changedTicket : any;
  constructor(private ticketService : TicketService, private route : RouterService) {
    this.ticketService.getTickets().subscribe(
      data => {this.tickets = data, console.log(data)},
      error => {console.log("No tickets")}
    )
   }

  ngOnInit(): void {
  }

  deleteTicket(pnrNo : string) {
    this.ticketService.deleteTicket(pnrNo).subscribe(
      data => {},
      error => {
        console.log("Ticket with "+pnrNo+" is deleted successfully")
      }
    )
    for(var i=0;i<this.tickets.length;i++) {
      if(this.tickets[i].pnrNo === pnrNo) {
        this.tickets.splice(i,1);
        break;
      }
    }
  }

  delete(pnrNo : string, passengerId : number) {
    this.ticketService.deletePassenger(pnrNo,passengerId).subscribe(
      data => {},
      error => {console.log("Passenger with "+passengerId+" is deleted successfully"), this.route.routeToTickets();}
    )
  }

  edit(pnrNo : string, passengerId : number) {
    this.isEditMode = true;
    for(var i=0;i<this.tickets.length;i++) {
      if(this.tickets[i].pnrNo === pnrNo) {
        this.changedTicket = this.tickets[i];
        this.passenger = this.tickets[i].passengers[passengerId-1];
        console.log(this.passenger)
        break;
      }
    }
    
    this.passengername = new FormControl(this.passenger.passengerName,[Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
      this.age = new FormControl(this.passenger.age, [Validators.required]);
      this.gender = new FormControl(this.passenger.gender, Validators.required);
  
      this.editPassenger =  new FormGroup({
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

  editPassengers() {
    this.passenger.passengerName = this.editPassenger.get("passengername").value;
    this.passenger.age = this.editPassenger.get("age").value;
    this.passenger.gender =this.editPassenger.get("gender").value;
    console.log(this.changedTicket)
    this.ticketService.editPassenger(this.changedTicket).subscribe(
      data => {console.log("Edited successfully")},
      error => {console.log("Error")}
    )
    this.isEditMode = false;
  }

  cancel() {
    this.isEditMode = false;
  }

}
