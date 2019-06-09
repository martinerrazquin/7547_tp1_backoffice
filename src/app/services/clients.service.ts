import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';  /* async */

import { User } from '../models/user';
import { ClientsApi } from '../models/clients-api';
import {API_URL} from "./api_url";


@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  constructor(private http: HttpClient) { }

  getClients(pageNum: number): Observable<ClientsApi> {
    const href = API_URL + 'clients';
    const requestUrl = `${href}?page=${pageNum}`;
    return this.http.get<ClientsApi>(requestUrl);
  }

  updateClientEnabled(id: number, enabled: boolean): Observable<User> {
    const requestUrl = API_URL + `clients/${id}/enabled-state`;
    return this.http.post<User>(requestUrl, { enabled: enabled });
  }
}

