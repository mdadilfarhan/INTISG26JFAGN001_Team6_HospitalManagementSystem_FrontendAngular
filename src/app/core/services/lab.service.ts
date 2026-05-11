import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  // Gateway base URL
  private baseUrl = `${environment.apiGatewayUrl}/lab-tests`;

  constructor(private http: HttpClient) {}

  // 1. GET PENDING LAB TESTS
  getPendingTests(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/pending`)
      .pipe(
        map(res => res?.data ?? [])
      );
  }

  // 2. CREATE LAB TEST (Doctor/Admin)
  createLabTest(request: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/create`,
      request
    );
  }

  // 3. COLLECT SAMPLE
  collectSample(labTestId: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${labTestId}/collect`,
      {}
    );
  }

  // 4. START TEST
  startTest(
    labTestId: number,
    assignedTo: string
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${labTestId}/start?assignedTo=${assignedTo}`,
      {}
    );
  }

  // 5. UPLOAD RESULT
  uploadResult(
    labTestId: number,
    result: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${labTestId}/result`,
      result
    );
  }

  // 6. GET RESULT BY TEST ID
  getResultByTestId(labTestId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${labTestId}/results`
    ).pipe(
      map(res => res?.data ?? null)
    );
  }

  // 7. GET RESULTS BY PATIENT ID
  getResultsByPatientId(patientId: number): Observable<any[]> {
    return this.http.get<any>(
      `${this.baseUrl}/patient/${patientId}/results`
    ).pipe(
      map(res => res?.data ?? [])
    );
  }

  // 8. GET TESTS BY APPOINTMENT ID
  getTestsByAppointmentId(appointmentId: number): Observable<any[]> {
    return this.http.get<any>(
      `${this.baseUrl}/appointment/tests/${appointmentId}`
    ).pipe(
      map(res => res?.data ?? [])
    );
  }

}
