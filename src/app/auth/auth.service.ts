import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

import { environment } from '../environment/environment';
import { UserLoginRequest } from '../Module/user-login-request.model';
import { TokenDto } from '../Module/token-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(loginData: UserLoginRequest): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.apiUrl}/auth/login`, loginData);
  }

 





}
