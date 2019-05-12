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

  private extractData(res: any): TripCost {
    const body = res;
    if (body && body.value) {
      return body.value as TripCost;
    }
    throw Error('not parseable');
  }

  getData(): Observable<TripCost> {
    return this.http.get<any>(this.serverURL, {})
      .pipe(
        map(this.extractData)
      );
  }

  updateData(tripCost: TripCost): Observable<TripCost> {
    return this.http.put<TripCost>(
        this.serverURL,
        { value: tripCost },
        {}
      ).pipe(
        map(this.extractData)
      );;
  }
}
