import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { TripsService } from "../../services/trips.service";
import { Trip } from '../../models/trip';
import { UsersService } from "../../services/users.service";
import { User, NO_USER } from "../../models/user";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip;
  isLoading: boolean = true;
  isLoadingDriver: boolean = true;
  isLoadingClient: boolean = true;
  clientData: User;
  driverData: User;
  paymentMethod: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) =>
        this.tripsService.getTrip(params.get('id'))
      )
    ).subscribe((trip) => {
      this.trip = trip;
      this.usersService.getUser(trip.clientId).subscribe(
        (clientData) => {
          this.clientData = clientData;
          this.loadedClient()
        },
        (e) => {
          this.clientData = NO_USER;
          this.loadedClient();
          console.log(e);
        }
      );
      if (trip.driver){
        this.usersService.getUser(trip.driver.userId).subscribe(
          (driverData) => {
            this.driverData = driverData;
            this.loadedDriver();
          },
          (e)=>{
            this.driverData = NO_USER;
            this.loadedDriver();
            console.log(e);
          }
        );
      }
      else{
        this.driverData = NO_USER;
        this.loadedDriver();
      }
      console.log(this.trip);
      /*mostrar lindo el payment method*/
      switch (trip.paymentMethod) {
        case "mp": {
          this.paymentMethod = "MercadoPago";
          break;
        }
        case "card": {
          this.paymentMethod = "Tarjeta de Crédito";
          break;
        }
        case "cash": {
          this.paymentMethod = "Efectivo";
          break;
        }
      }
    });
  }

  loadedClient() {
    this.isLoadingClient = false;
    this.isLoading = this.isLoadingClient || this.isLoadingDriver;
    console.log(this.clientData);
  }

  loadedDriver() {
    this.isLoadingDriver = false;
    this.isLoading = this.isLoadingClient || this.isLoadingDriver;
    console.log(this.driverData);
  }

}
