import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';  /* async */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { TripCost } from '../models/tripcost';
import { TripcostsApi } from '../models/trip-costs-api';

@Injectable({
  providedIn: 'root'
})

export class TripcostsService {

  private serverURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getData(): Observable<TripCost> {
    return this.http.get<TripCost>(
      this.serverURL + 'manage/constants/tripcosts'
    );
  }

  getHistory(pageNum: number): Observable<TripcostsApi> {
    const href = this.serverURL + 'manage/constants/tripcosts/history';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<TripcostsApi>(requestUrl);
  }

  updateData(tripCost: TripCost): Observable<TripCost> {
    return this.http.post<TripCost>(
      this.serverURL + 'manage/constants/tripcosts', 
      tripCost
    );
  }
}
