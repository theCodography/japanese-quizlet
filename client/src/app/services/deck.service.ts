import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { ApiResponse } from './learn.service';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/decks';

  getAllDecks(): Observable<ApiResponse<Deck[]>> {
    return this.http.get<ApiResponse<Deck[]>>(this.baseUrl);
  }

  getDeckById(id: string): Observable<ApiResponse<Deck>> {
    return this.http.get<ApiResponse<Deck>>(`${this.baseUrl}/${id}`);
  }

  createDeck(payload: { title: string; description?: string; isPublic?: boolean }): Observable<ApiResponse<Deck>> {
    return this.http.post<ApiResponse<Deck>>(this.baseUrl, payload);
  }

  createCard(deckId: string, payload: { term: string; definition: string; example?: string }): Observable<ApiResponse<Card>> {
    return this.http.post<ApiResponse<Card>>(`${this.baseUrl}/${deckId}/cards`, payload);
  }
}
