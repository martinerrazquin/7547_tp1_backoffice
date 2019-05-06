import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';  /* async */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { TRIPCOSTS } from './mock-tripcosts'; /* mock value */
import { TripCost} from './tripcost';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }),
};

@Injectable({
  providedIn: 'root'
})
export class TripcostsService {

  private serverURL = 'http://localhost:3000/manage/constants/tripcosts';

  constructor(private http: HttpClient) { }

  private extractData(res: Response): TripCost {
    const body = JSON.parse((res as any));
    if (body && body.value) {
      return body.value;
    }
    throw Error('not parseable');
  }

  /* mocked one
  getData(): Observable<TripCost> {
    return of(TRIPCOSTS);
  }
  */
  getData(): Observable<TripCost> {
    console.warn(this.serverURL);
    console.warn(httpOptions);
    let data = this.http.get<any>(this.serverURL, httpOptions)
      .pipe(
        tap( d => console.warn(d))
      ).subscribe( d => console.log(d));
    return of(TRIPCOSTS);
  }
}
