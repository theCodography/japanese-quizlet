import { Card } from './card.model';

export interface Deck {
  id: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  creatorId?: string;
  createdAt?: string;
  updatedAt?: string;
  cards?: Card[];
  _count?: { cards: number };
}
