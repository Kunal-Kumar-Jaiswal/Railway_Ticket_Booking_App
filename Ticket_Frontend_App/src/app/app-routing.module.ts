import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { TicketComponent } from './ticket/ticket.component';
import { TrainsComponent } from './trains/trains.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

const routes: Routes = [
  { path : '', component : BookingComponent },
  { path: 'login', component: LoginComponent },
  { path : 'register', component : RegistrationComponent},
  { path : 'train/:from/:to/:date', component: TrainsComponent},
  { path : 'train/:from/:to/:date/:trainNo', component : TicketComponent, canActivate: [AuthenticationGuard]},
  { path : 'profile', component: ProfileComponent},
  { path : 'view-ticket', component: ViewTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
