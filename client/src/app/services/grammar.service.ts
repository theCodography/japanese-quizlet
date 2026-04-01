import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GrammarLesson, GrammarLevel, GrammarByLevelData } from '../models/grammar.model';
import { ApiResponse } from './learn.service';

@Injectable({ providedIn: 'root' })
export class GrammarService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/grammar`;

  getAllGrammar(params?: { level?: string; search?: string }): Observable<ApiResponse<GrammarLesson[]>> {
    const queryParams: any = {};
    if (params?.level) queryParams.level = params.level;
    if (params?.search) queryParams.search = params.search;
    return this.http.get<ApiResponse<GrammarLesson[]>>(this.baseUrl, { params: queryParams });
  }

  getGrammarLevels(): Observable<ApiResponse<GrammarLevel[]>> {
    return this.http.get<ApiResponse<GrammarLevel[]>>(`${this.baseUrl}/levels`);
  }

  getGrammarByLevel(level: string): Observable<ApiResponse<GrammarByLevelData>> {
    return this.http.get<ApiResponse<GrammarByLevelData>>(`${this.baseUrl}/level/${level}`);
  }

  getGrammarById(id: string): Observable<ApiResponse<GrammarLesson>> {
    return this.http.get<ApiResponse<GrammarLesson>>(`${this.baseUrl}/${id}`);
  }
}
