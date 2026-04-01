export interface Card {
  id: string;
  deckId: string;
  term: string;
  definition: string;
  example?: string;
  createdAt?: string;
  updatedAt?: string;
}
