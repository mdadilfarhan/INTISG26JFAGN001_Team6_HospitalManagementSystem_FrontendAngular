import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse, CreateUserRequest } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiGatewayUrl}/users`;

  constructor(private http: HttpClient) {}

  createUser(request: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}/create`,
      request
    );
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.baseUrl}/all`
    );
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.baseUrl}/id/${id}`
    );
  }

  getUserByUsername(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.baseUrl}/username/${username}`
    );
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/delete/${id}`,
      { responseType: 'text' as 'json' }
    );
  }
}