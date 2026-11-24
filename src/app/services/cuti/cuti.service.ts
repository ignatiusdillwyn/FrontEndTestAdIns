import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Cuti,
  CutiCreateRequest,
  CutiStatus,
  CutiUpdateRequest
} from '../../models/cuti-model';

@Injectable({
  providedIn: 'root'
})
export class CutiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/cutis`;

  getAll(): Observable<Cuti[]> {
    return this.http.get<Cuti[]>(this.baseUrl);
  }

  getAllCutiByEmployeeId(): Observable<Cuti[]> {
    return this.http.get<Cuti[]>(`${this.baseUrl}/getAllCutiByEmployeeId`);
  }

  create(body: CutiCreateRequest): Observable<Cuti> {
    return this.http.post<Cuti>(this.baseUrl, body);
  }

  updateStatus(cuti: Cuti, status: CutiStatus): Observable<Cuti> {
    const body: CutiUpdateRequest = {
      startDate: cuti.startDate,
      endDate: cuti.endDate,
      reason: cuti.reason,
      status
    };
    return this.http.put<Cuti>(`${this.baseUrl}/${cuti.id}`, body);
  }

  delete(cutiId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cutiId}`);
  }
}