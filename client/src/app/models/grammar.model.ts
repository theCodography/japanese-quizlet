export interface GrammarLesson {
  id: string;
  title: string;
  structure: string;
  meaning: string;
  explanation?: string;
  example: string;
  example2?: string;
  example3?: string;
  level: string;
  textbook: string;
  lesson?: number;
  order: number;
  createdAt?: string;
}

export interface GrammarLevel {
  level: string;
  count: number;
}

export interface GrammarByLevelData {
  items: GrammarLesson[];
  byLesson: Record<number, GrammarLesson[]>;
}
