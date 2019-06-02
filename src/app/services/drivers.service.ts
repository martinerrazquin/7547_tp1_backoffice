import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import { DriversApi } from '../models/drivers-api';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})

export class DriversService {
  API_URL: string = "http://localhost:3000/"; // "https://stagingserver7547.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getDrivers(pageNum: number): Observable<DriversApi> {
    const href = this.API_URL + 'drivers';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<DriversApi>(requestUrl);
  }

  updateDriverEnabled(id: number, enabled: boolean): Observable<Driver> {
    const requestUrl = this.API_URL + `drivers/${id}/enabled-state`;
    return this.http.post(requestUrl, { enabled: enabled });
  }
}
