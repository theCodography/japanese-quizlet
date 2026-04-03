export interface CardProgress {
  rating: 'hard' | 'good' | 'easy' | null;
  starred: boolean;
}

export interface Card {
  id: string;
  deckId: string;
  term: string;
  definition: string;
  example?: string;
  progress?: CardProgress | null;
  createdAt?: string;
  updatedAt?: string;
}
