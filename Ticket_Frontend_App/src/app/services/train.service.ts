import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Train } from '../model/Train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  constructor(private httpClient : HttpClient) { 
  }

  getTrains(train : Train) {
    return  this.httpClient.get("http://localhost:8091/train/getTrains?from="+train.from+"&to="+train.to+"&date="+train.date );
  }

  getTrainById(trainNo : number) {
    return this.httpClient.get("http://localhost:8091/train/getTrain/"+trainNo);
  }

  getFroms() {
    return this.httpClient.get("http://localhost:8091/train/getFrom");
  }

  getDestinations() {
    return this.httpClient.get("http://localhost:8091/train/getTo");
  }
  
}
