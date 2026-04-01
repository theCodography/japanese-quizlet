import { Component, OnInit, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnService } from '../../services/learn.service';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';

type Rating = 'hard' | 'good' | 'easy';

@Component({
  selector: 'app-learn',
  imports: [CommonModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private learnService = inject(LearnService);

  // ── State Signals ──────────────────────────────
  deck = signal<Deck | null>(null);
  cards = signal<Card[]>([]);
  currentIndex = signal(0);
  isRevealed = signal(false);   // Thay vì isFlipped: reveal ở chỗ (không 3D flip)
  isFinished = signal(false);
  isLoading = signal(true);

  // Rating history để tính accuracy
  private ratingHistory = signal<Rating[]>([]);

  // ── Computed ───────────────────────────────────
  currentCard = computed(() => {
    const _cards = this.cards();
    const idx = this.currentIndex();
    return _cards.length > 0 && idx < _cards.length ? _cards[idx] : null;
  });

  progressPercentage = computed(() => {
    const total = this.cards().length;
    if (total === 0) return 0;
    return Math.min(100, Math.round((this.currentIndex() / total) * 100));
  });

  accuracyPercent = computed(() => {
    const history = this.ratingHistory();
    if (history.length === 0) return 92; // default hiển thị
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
          this.cards.set(res.data.cards || []);
          this.currentIndex.set(0);
          this.isFinished.set(false);
          this.ratingHistory.set([]);
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
  revealCard() {
    if (!this.isFinished() && !this.isRevealed()) {
      this.isRevealed.set(true);
    }
  }

  rateCard(rating: Rating) {
    if (!this.isRevealed()) return;

    // Ghi lại rating vào history
    this.ratingHistory.update(h => [...h, rating]);

    // Reset revealed và chuyển sang thẻ tiếp theo
    this.isRevealed.set(false);
    setTimeout(() => {
      const nextIdx = this.currentIndex() + 1;
      if (nextIdx >= this.cards().length) {
        this.isFinished.set(true);
      } else {
        this.currentIndex.set(nextIdx);
      }
    }, 100);
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
    this.isRevealed.set(false);
    this.ratingHistory.set([]);
  }

  // ── Keyboard Shortcuts ─────────────────────────
  // Space  → Reveal
  // 1      → Hard
  // 2      → Good
  // 3      → Easy
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isLoading() || this.isFinished()) return;

    // Không kích hoạt khi đang gõ trong input
    if ((event.target as HTMLElement)?.tagName === 'INPUT') return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        if (!this.isRevealed()) {
          this.revealCard();
        }
        break;
      case 'Digit1':
        if (this.isRevealed()) this.rateCard('hard');
        break;
      case 'Digit2':
        if (this.isRevealed()) this.rateCard('good');
        break;
      case 'Digit3':
        if (this.isRevealed()) this.rateCard('easy');
        break;
    }
  }
}
