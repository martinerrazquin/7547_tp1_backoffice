import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import { TripsApi } from '../models/trips-api';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripsService {
  API_URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getTrip(id: string): Observable<Trip> {
    const href = this.API_URL + 'trips';
    const requestUrl = `${href}/${id}`;
    return this.http.get<Trip>(requestUrl);
  }

  getTrips(pageNum: number): Observable<TripsApi> {
    const href = this.API_URL + 'trips';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<TripsApi>(requestUrl);
  }
}
