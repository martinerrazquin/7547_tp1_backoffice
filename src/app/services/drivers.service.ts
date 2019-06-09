import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import { DriversApi } from '../models/drivers-api';
import { Driver } from '../models/driver';
import { FullDriver } from '../models/full-driver';
import {API_URL} from "./api_url";

@Injectable({
  providedIn: 'root'
})

export class DriversService {

  constructor(private http: HttpClient) { }

  getDrivers(pageNum: number): Observable<DriversApi> {
    const href = API_URL + 'drivers';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<DriversApi>(requestUrl);
  }

  updateDriverEnabled(id: number, enabled: boolean): Observable<Driver> {
    const requestUrl = API_URL + `drivers/${id}/enabled-state`;
    return this.http.post(requestUrl, { enabled: enabled });
  }

  getDriverImages(id: number): Observable<FullDriver> {
    const requestUrl = API_URL + `drivers/${id}/images`;
    return this.http.get<FullDriver>(requestUrl);
  }
}
