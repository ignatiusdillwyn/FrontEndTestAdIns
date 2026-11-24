import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CutiRemaining } from '../../models/cuti-remaining-model';

@Injectable({
  providedIn: 'root'
})
export class CutiRemainingService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/cuti-remainings`;

  getCutiRemainingByEmployeeId(): Observable<CutiRemaining> {
    return this.http.get<CutiRemaining>(`${this.baseUrl}/getCutiRemainingByEmployeeId`);
  }
}