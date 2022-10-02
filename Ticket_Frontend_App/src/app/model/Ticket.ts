import { Passenger } from "./Passenger";
import { Train } from "./Train";

export class Ticket {
    pnrNo : string;
    userEmail : string;
    train : Train;
    passengers : Array<Passenger>
}