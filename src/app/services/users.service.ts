import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "./api_url";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const href = API_URL + 'users';
    const requestUrl = `${href}/${id}`;
    return this.http.get<User>(requestUrl);
  }

}
