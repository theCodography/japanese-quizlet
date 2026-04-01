import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GrammarService } from '../../services/grammar.service';
import { GrammarLesson, GrammarLevel } from '../../models/grammar.model';

@Component({
  selector: 'app-grammar-library',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './grammar-library.component.html',
  styleUrl: './grammar-library.component.css'
})
export class GrammarLibraryComponent implements OnInit {
  levels = signal<GrammarLevel[]>([]);
  grammarList = signal<GrammarLesson[]>([]);
  isLoading = signal(true);
  selectedLevel = signal<string>('');
  searchQuery = signal('');
  expandedId = signal<string | null>(null);
  groupedByLesson = signal<Record<number, GrammarLesson[]>>({});

  filteredGrammar = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const items = this.grammarList();
    if (!query) return items;
    return items.filter(g =>
      g.title.toLowerCase().includes(query) ||
      g.structure.toLowerCase().includes(query) ||
      g.meaning.toLowerCase().includes(query) ||
      g.example.toLowerCase().includes(query)
    );
  });

  filteredGrouped = computed(() => {
    const filtered = this.filteredGrammar();
    const grouped: Record<number, GrammarLesson[]> = {};
    for (const g of filtered) {
      const key = g.lesson ?? 0;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(g);
    }
    return grouped;
  });

  lessonKeys = computed(() => {
    return Object.keys(this.filteredGrouped()).map(Number).sort((a, b) => a - b);
  });

  levelConfig: Record<string, { label: string; textbook: string; color: string; gradient: string }> = {
    'N5': { label: 'N5', textbook: 'Minna no Nihongo 1', color: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
    'N4': { label: 'N4', textbook: 'Minna no Nihongo 2', color: 'text-blue-600', gradient: 'from-blue-500 to-indigo-500' },
    'N3': { label: 'N3', textbook: 'Shinkanzen N3', color: 'text-purple-600', gradient: 'from-purple-500 to-fuchsia-500' },
  };

  constructor(private grammarService: GrammarService) {}

  ngOnInit() {
    this.loadLevels();
  }

  loadLevels() {
    this.grammarService.getGrammarLevels().subscribe({
      next: (res) => {
        this.levels.set(res.data || []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  selectLevel(level: string) {
    this.selectedLevel.set(level);
    this.isLoading.set(true);
    this.searchQuery.set('');
    this.expandedId.set(null);

    this.grammarService.getGrammarByLevel(level).subscribe({
      next: (res) => {
        this.grammarList.set(res.data?.items || []);
        this.groupedByLesson.set(res.data?.byLesson || {});
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  backToLevels() {
    this.selectedLevel.set('');
    this.grammarList.set([]);
    this.searchQuery.set('');
    this.expandedId.set(null);
  }

  toggleExpand(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  getLessonLabel(lessonNum: number): string {
    if (lessonNum === 0) return 'Khác';
    return `Bài ${lessonNum}`;
  }

  getConfig(level: string) {
    return this.levelConfig[level] || { label: level, textbook: '', color: 'text-gray-600', gradient: 'from-gray-500 to-gray-600' };
  }
}
