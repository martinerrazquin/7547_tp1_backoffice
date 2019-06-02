/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
declare let google: any;   /* si esto no anda la culpa es de https://stackoverflow.com/questions/52364715/angular-6-types-googlemaps-index-d-ts-is-not-a-module */

import { TripsService } from "../../services/trips.service";
import { Trip } from '../../models/trip';
import { UsersService } from "../../services/users.service";
import { User, NO_USER } from "../../models/user";


import { ViewChild } from '@angular/core';

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
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

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
      /* mostrar lindo el payment method */
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
      /* inicializar el mapa */
      var mapProp = {
        center: new google.maps.LatLng(this.trip.origin.lat, this.trip.origin.lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
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
