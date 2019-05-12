import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';  /* async */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { TripCost } from '../models/tripcost';

@Injectable({
  providedIn: 'root'
})

export class TripcostsService {

  private serverURL = 'http://localhost:3000/manage/constants/tripcosts';

  constructor(private http: HttpClient) { }

  getData(): Observable<TripCost> {
    return this.http.get<TripCost>(this.serverURL);
  }

  updateData(tripCost: TripCost): Observable<TripCost> {
    return this.http.post<TripCost>(this.serverURL, tripCost);
  }
}
