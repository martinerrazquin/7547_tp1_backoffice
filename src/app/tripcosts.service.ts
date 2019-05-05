import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';  /* async */

import { TRIPCOSTS } from './mock-tripcosts'; /* mock value */
import { TripCost} from './tripcost';

@Injectable({
  providedIn: 'root'
})
export class TripcostsService {

  constructor() { }

  getData(): Observable<TripCost> {
    return of(TRIPCOSTS);
  }
}
