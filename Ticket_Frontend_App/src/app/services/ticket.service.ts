import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient : HttpClient) { }

  bookTicket(ticket : Ticket) {
    return this.httpClient.post("http://localhost:8084/ticket/ticket",ticket);
  }

  getTickets() {
    return this.httpClient.get("http://localhost:8084/ticket/tickets/"+sessionStorage.getItem("token"));
  }

  deleteTicket(pnrNo : string) {
    return this.httpClient.delete("http://localhost:8084/ticket/"+pnrNo);
  }

  deletePassenger(pnrNo : string, passengerId : number) {
    return this.httpClient.delete("http://localhost:8084/ticket/passenger/"+pnrNo+"/"+passengerId);
  }

  editPassenger(ticket : Ticket) {
    return this.httpClient.put("http://localhost:8084/ticket/update",ticket);
  }
}
