import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class LearnService {
  private apiUrl = 'http://localhost:3000/api/learn';

  constructor(private http: HttpClient) {}

  getDeckForLearning(deckId: string): Observable<ApiResponse<Deck>> {
    return this.http.get<ApiResponse<Deck>>(`${this.apiUrl}/decks/${deckId}`);
  }
}
