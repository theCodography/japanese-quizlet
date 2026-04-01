import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-deck-detail',
  imports: [FormsModule],
  templateUrl: './deck-detail.component.html',
  styleUrl: './deck-detail.component.css'
})
export class DeckDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private deckService = inject(DeckService);

  deck = signal<Deck | null>(null);
  isLoading = signal(true);
  previewExpanded = signal(false);

  showAddCardModal = signal(false);
  isAddingCard = signal(false);
  addCardError = signal('');
  newTerm = '';
  newDefinition = '';
  newExample = '';

  ngOnInit() {
    this.loadDeck();
  }

  private loadDeck() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading.set(true);
    this.deckService.getDeckById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.deck.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  get previewCards(): Card[] {
    const cards = this.deck()?.cards ?? [];
    return this.previewExpanded() ? cards : cards.slice(0, 5);
  }

  get totalCards(): number {
    const d = this.deck();
    return d?._count?.cards ?? d?.cards?.length ?? 0;
  }

  get estimatedMinutes(): number {
    return Math.max(1, Math.ceil(this.totalCards * 0.5));
  }

  startLearning() {
    const id = this.deck()?.id;
    if (id) this.router.navigate(['/learn', id]);
  }

  goBack() {
    this.router.navigate(['/decks']);
  }

  openAddCardModal() {
    this.newTerm = '';
    this.newDefinition = '';
    this.newExample = '';
    this.addCardError.set('');
    this.showAddCardModal.set(true);
  }

  closeAddCardModal() {
    if (this.isAddingCard()) return;
    this.showAddCardModal.set(false);
  }

  submitAddCard() {
    if (!this.newTerm.trim()) {
      this.addCardError.set('Vui lòng nhập mặt trước (từ/kanji).');
      return;
    }
    if (!this.newDefinition.trim()) {
      this.addCardError.set('Vui lòng nhập mặt sau (nghĩa).');
      return;
    }
    const deckId = this.deck()?.id;
    if (!deckId) return;

    this.isAddingCard.set(true);
    this.addCardError.set('');

    this.deckService.createCard(deckId, {
      term: this.newTerm.trim(),
      definition: this.newDefinition.trim(),
      example: this.newExample.trim() || undefined,
    }).subscribe({
      next: (res) => {
        this.isAddingCard.set(false);
        if (res.success && res.data) {
          // Thêm card mới vào deck hiện tại không cần reload toàn bộ
          const current = this.deck();
          if (current) {
            const updatedCards = [...(current.cards ?? []), res.data];
            this.deck.set({
              ...current,
              cards: updatedCards,
              _count: { cards: updatedCards.length }
            });
          }
          this.newTerm = '';
          this.newDefinition = '';
          this.newExample = '';
          this.addCardError.set('');
          // Giữ modal mở để tiếp tục thêm thẻ
        } else {
          this.addCardError.set('Thêm thẻ thất bại. Vui lòng thử lại.');
        }
      },
      error: () => {
        this.isAddingCard.set(false);
        this.addCardError.set('Không thể kết nối máy chủ. Vui lòng thử lại.');
      }
    });
  }
}
