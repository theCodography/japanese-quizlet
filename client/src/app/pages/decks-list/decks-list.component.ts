import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';

@Component({
  selector: 'app-decks-list',
  imports: [FormsModule],
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.css'
})
export class DecksListComponent implements OnInit {
  private deckService = inject(DeckService);
  private router = inject(Router);

  decks = signal<Deck[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');

  showCreateModal = signal(false);
  isCreating = signal(false);
  createError = signal('');
  newTitle = '';
  newDescription = '';
  newIsPublic = false;

  filteredDecks = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.decks();
    return this.decks().filter(d =>
      d.title.toLowerCase().includes(q) ||
      (d.description || '').toLowerCase().includes(q)
    );
  });

  ngOnInit() {
    this.loadDecks();
  }

  private loadDecks() {
    this.isLoading.set(true);
    this.deckService.getAllDecks().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.decks.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  goToDeck(id: string) {
    this.router.navigate(['/decks', id]);
  }

  startLearning(event: Event, id: string) {
    event.stopPropagation();
    this.router.navigate(['/learn', id]);
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  openCreateModal() {
    this.newTitle = '';
    this.newDescription = '';
    this.newIsPublic = false;
    this.createError.set('');
    this.showCreateModal.set(true);
  }

  closeCreateModal() {
    if (this.isCreating()) return;
    this.showCreateModal.set(false);
  }

  submitCreateDeck() {
    if (!this.newTitle.trim()) {
      this.createError.set('Vui lòng nhập tên bộ thẻ.');
      return;
    }
    this.isCreating.set(true);
    this.createError.set('');
    this.deckService.createDeck({
      title: this.newTitle.trim(),
      description: this.newDescription.trim() || undefined,
      isPublic: this.newIsPublic
    }).subscribe({
      next: (res) => {
        this.isCreating.set(false);
        if (res.success && res.data) {
          this.showCreateModal.set(false);
          this.loadDecks();
        } else {
          this.createError.set('Tạo bộ thẻ thất bại. Vui lòng thử lại.');
        }
      },
      error: () => {
        this.isCreating.set(false);
        this.createError.set('Không thể kết nối máy chủ. Vui lòng thử lại.');
      }
    });
  }
}
