export class User {
    email : string;
    username: string;
    password : string;
    dob : Date;
    gender : string;
    mobile : string;
    image : any;

    constructor() {
        this.email = "";
        this.username = "";
        this.password = "";
        this.dob = new Date();
        this.gender = "";
        this.mobile = "";
    }
}