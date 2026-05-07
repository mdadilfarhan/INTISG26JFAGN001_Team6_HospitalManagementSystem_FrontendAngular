import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  NotificationResponse,
  SendNotificationRequest
} from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = `${environment.apiGatewayUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getAllNotifications(userId: number): Observable<NotificationResponse[]> {
    return this.http.get<NotificationResponse[]>(
      `${this.baseUrl}/${userId}/allMessages`
    );
  }

  getUnreadNotifications(userId: number): Observable<NotificationResponse[]> {
    return this.http.get<NotificationResponse[]>(
      `${this.baseUrl}/${userId}/unread`
    );
  }

  markAsRead(notificationId: number): Observable<NotificationResponse> {
    return this.http.put<NotificationResponse>(
      `${this.baseUrl}/${notificationId}/read`,
      {}
    );
  }

  markAllAsRead(userId: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.baseUrl}/${userId}/read-all`,
      {}
    );
  }

  sendNotification(request: SendNotificationRequest): Observable<NotificationResponse> {
    return this.http.post<NotificationResponse>(
      `${this.baseUrl}/send`,
      request
    );
  }
}