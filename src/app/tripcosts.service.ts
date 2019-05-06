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

  private extractData(res: any): TripCost {
    const body = res;
    if (body && body.value) {
      return body.value as TripCost;
    }
    throw Error('not parseable');
  }

  /* mocked one
  getData(): Observable<TripCost> {
    return of(TRIPCOSTS);
  }
  */
  getData(): Observable<TripCost> {
    let asd = this.http.get<any>(this.serverURL, httpOptions)
      .pipe(
        map(this.extractData)
      );
    asd.subscribe( d => console.log(d));
    /*return of(TRIPCOSTS);*/
    return asd;
  }
}
