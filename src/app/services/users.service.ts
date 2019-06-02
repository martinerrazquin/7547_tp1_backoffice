import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL: string = "http://localhost:3000/"; // "https://stagingserver7547.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const href = this.API_URL + 'users';
    const requestUrl = `${href}/${id}`;
    return this.http.get<User>(requestUrl);
  }

}
