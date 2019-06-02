import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import {API_URL} from "./api_url";
import { TripsApi } from '../models/trips-api';
import { Trip } from '../models/trip';
import { TripLocation } from "../models/triplocation";
import { Route } from "../models/route";
import { Location } from "../models/location";

@Injectable({
  providedIn: 'root'
})

export class TripsService {

  constructor(private http: HttpClient) { }

  getTrip(id: string): Observable<Trip> {
    const href = API_URL + 'trips';
    const requestUrl = `${href}/${id}`;
    return this.http.get<Trip>(requestUrl);
  }


  getTrips(pageNum: number, filters: any): Observable<TripsApi> {
    const href = API_URL + 'trips';
    const requestUrl = `${href}?page=${pageNum}&driver=${filters.driverName}`
                        + `&onlyCurrent=${filters.showOnlyCurrent}`;
    return this.http.get<TripsApi>(requestUrl);
  }

  getTripLocation(id: number): Observable<TripLocation> {
    const href = API_URL + 'trips';
    const requestUrl = `${href}/${id}/location`;
    return this.http.get<TripLocation>(requestUrl);
  }

  getRoute(origin: Location, destination: Location): Observable<Route> {
    const requestUrl = API_URL + 'info/route';
    return this.http.post<Route>(
      requestUrl,
      {origin: origin, destination: destination}
    );
  }
}
