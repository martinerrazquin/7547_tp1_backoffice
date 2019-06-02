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
      this.initMap();
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

  initMap(){
    /* crear mapa, centrar en origen */
    var origLatLng = new google.maps.LatLng(this.trip.origin.lat, this.trip.origin.lng);
    var destLatLng = new google.maps.LatLng(this.trip.destination.lat, this.trip.destination.lng);
    var mapProp = {
      center: origLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    /* markers */
    var origMarker = new google.maps.Marker({position: origLatLng, map: this.map, label: 'O', title: 'Origen'});
    var destMarker = new google.maps.Marker({position: destLatLng, map: this.map, label: 'D', title: 'Destino'});

    /* route */
    var waypoints = [origLatLng, destLatLng]; /* FIXME: agregar los otros waypoints*/
    var suggRoute = new google.maps.Polyline({
      path: waypoints, geodesic: true, strokeColor: '#324eee', strokeOpacity: 0.75,   strokeWeight: 3
    });
    suggRoute.setMap(this.map);

    /* driver location marker */
    var icon = {
      url: "https://image.flaticon.com/icons/png/128/31/31126.png",
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(15, 15)
    };
    var MOCK_POSITION = new google.maps.LatLng(
      0.5*this.trip.origin.lat+0.5*this.trip.destination.lat,
      0.3*this.trip.origin.lng+0.7*this.trip.destination.lng,
    );
    var driverMarker = new google.maps.Marker(
      {position: MOCK_POSITION, map: this.map, icon: icon, title: 'Ubicación actual'});
  }

}
