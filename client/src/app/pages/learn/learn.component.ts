import { Component, OnInit, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LearnService } from '../../services/learn.service';
import { DeckService } from '../../services/deck.service';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';

type Rating = 'hard' | 'good' | 'easy';

@Component({
  selector: 'app-learn',
  imports: [CommonModule, RouterModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private learnService = inject(LearnService);
  private deckService = inject(DeckService);

  // ── State Signals ──────────────────────────────
  deck = signal<Deck | null>(null);
  cards = signal<Card[]>([]);
  currentIndex = signal(0);
  isFlipped = signal(false);
  isFinished = signal(false);
  isLoading = signal(true);
  isTransitioning = signal(false);
  slideDirection = signal<'none' | 'slide-out' | 'slide-in'>('none');

  // Rating & star per card (local cache, synced to server)
  cardRatings = signal<Map<string, Rating>>(new Map());
  starredCards = signal<Set<string>>(new Set());

  // Rating history để tính accuracy
  private ratingHistory = signal<Rating[]>([]);

  // ── Computed ───────────────────────────────────
  currentCard = computed(() => {
    const _cards = this.cards();
    const idx = this.currentIndex();
    return _cards.length > 0 && idx < _cards.length ? _cards[idx] : null;
  });

  currentCardRating = computed(() => {
    const card = this.currentCard();
    if (!card) return null;
    return this.cardRatings().get(card.id) || null;
  });

  isCurrentCardStarred = computed(() => {
    const card = this.currentCard();
    if (!card) return false;
    return this.starredCards().has(card.id);
  });

  progressPercentage = computed(() => {
    const total = this.cards().length;
    if (total === 0) return 0;
    return Math.min(100, Math.round((this.currentIndex() / total) * 100));
  });

  accuracyPercent = computed(() => {
    const history = this.ratingHistory();
    if (history.length === 0) return 92;
    const goodOrEasy = history.filter(r => r === 'good' || r === 'easy').length;
    return Math.round((goodOrEasy / history.length) * 100);
  });

  // ── Lifecycle ──────────────────────────────────
  ngOnInit() {
    const deckId = this.route.snapshot.paramMap.get('id') || 'demo';
    this.loadDeck(deckId);
  }

  loadDeck(id: string) {
    this.isLoading.set(true);
    this.learnService.getDeckForLearning(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.deck.set(res.data);
          const cards = res.data.cards || [];
          this.cards.set(cards);
          this.currentIndex.set(0);
          this.isFinished.set(false);
          this.ratingHistory.set([]);

          // Load existing progress from server response
          const ratings = new Map<string, Rating>();
          const starred = new Set<string>();
          for (const card of cards) {
            if (card.progress?.rating) {
              ratings.set(card.id, card.progress.rating as Rating);
            }
            if (card.progress?.starred) {
              starred.add(card.id);
            }
          }
          this.cardRatings.set(ratings);
          this.starredCards.set(starred);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Lỗi khi tải thẻ:', err);
        this.isLoading.set(false);
      }
    });
  }

  // ── Card Actions ───────────────────────────────
  flipCard() {
    if (!this.isFinished() && !this.isTransitioning()) {
      this.isFlipped.update(v => !v);
    }
  }

  toggleStar() {
    const card = this.currentCard();
    if (!card) return;

    const isNowStarred = !this.starredCards().has(card.id);

    this.starredCards.update(set => {
      const next = new Set(set);
      if (isNowStarred) {
        next.add(card.id);
      } else {
        next.delete(card.id);
      }
      return next;
    });

    // Persist to server
    this.deckService.updateCardProgress(card.id, { starred: isNowStarred }).subscribe({
      error: (err) => console.error('Failed to save star:', err),
    });
  }

  rateCard(rating: Rating) {
    if (!this.isFlipped()) return;

    const card = this.currentCard();
    if (card) {
      this.cardRatings.update(map => {
        const next = new Map(map);
        next.set(card.id, rating);
        return next;
      });

      // Persist rating to server
      this.deckService.updateCardProgress(card.id, { rating }).subscribe({
        error: (err) => console.error('Failed to save rating:', err),
      });
    }

    this.ratingHistory.update(h => [...h, rating]);

    // Slide out → change card → slide in
    this.isTransitioning.set(true);
    this.slideDirection.set('slide-out');

    setTimeout(() => {
      this.isFlipped.set(false);
      const nextIdx = this.currentIndex() + 1;
      if (nextIdx >= this.cards().length) {
        this.isFinished.set(true);
        this.isTransitioning.set(false);
        this.slideDirection.set('none');
      } else {
        this.currentIndex.set(nextIdx);
        this.slideDirection.set('slide-in');
        setTimeout(() => {
          this.slideDirection.set('none');
          this.isTransitioning.set(false);
        }, 350);
      }
    }, 300);
  }

  goBack() {
    const deckId = this.deck()?.id;
    if (deckId && deckId !== 'demo') {
      this.router.navigate(['/decks', deckId]);
    } else {
      this.router.navigate(['/decks']);
    }
  }

  restart() {
    this.currentIndex.set(0);
    this.isFinished.set(false);
    this.isFlipped.set(false);
    this.ratingHistory.set([]);
    // Keep ratings & stars — they are persisted server-side
    this.slideDirection.set('none');
    this.isTransitioning.set(false);
  }

  getRatingLabel(rating: Rating): string {
    switch (rating) {
      case 'hard': return 'Hard';
      case 'good': return 'Good';
      case 'easy': return 'Easy';
    }
  }

  getRatingClasses(rating: Rating): string {
    switch (rating) {
      case 'hard': return 'bg-error/20 text-error';
      case 'good': return 'bg-primary/20 text-primary';
      case 'easy': return 'bg-secondary/20 text-secondary';
    }
  }

  get starFillStyle(): string {
    return this.isCurrentCardStarred() ? "'FILL' 1" : "'FILL' 0";
  }

  // ── Keyboard Shortcuts ─────────────────────────
  // Space  → Flip
  // 1      → Hard
  // 2      → Good
  // 3      → Easy
  // S      → Star
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isLoading() || this.isFinished() || this.isTransitioning()) return;
    if ((event.target as HTMLElement)?.tagName === 'INPUT') return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.flipCard();
        break;
      case 'Digit1':
        if (this.isFlipped()) this.rateCard('hard');
        break;
      case 'Digit2':
        if (this.isFlipped()) this.rateCard('good');
        break;
      case 'Digit3':
        if (this.isFlipped()) this.rateCard('easy');
        break;
      case 'KeyS':
        this.toggleStar();
        break;
    }
  }
}
