import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import {API_URL} from "./api_url";
import { TripsApi } from '../models/trips-api';
import { Trip } from '../models/trip';

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

  getTrips(pageNum: number): Observable<TripsApi> {
    const href = API_URL + 'trips';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<TripsApi>(requestUrl);
  }
}
