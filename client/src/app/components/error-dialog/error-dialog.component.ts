import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" (click)="close.emit()">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative bg-[#1e2035] rounded-2xl p-8 max-w-md w-full shadow-2xl ring-1 ring-[#fbb3c1]/10"
           (click)="$event.stopPropagation()">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-[#93000A]/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-[#FFB4AB]">error</span>
          </div>
          <h3 class="text-lg font-bold text-[#e0e0fa]">{{ title() }}</h3>
        </div>
        <p class="text-[#d6c2c4] text-sm leading-relaxed mb-8">{{ message() }}</p>
        <div class="flex justify-end">
          <button (click)="close.emit()"
            class="bg-[#fbb3c1] text-[#50212d] px-8 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
            OK
          </button>
        </div>
      </div>
    </div>
  `
})
export class ErrorDialogComponent {
  title = input('Error');
  message = input('Something went wrong. Please try again.');
  close = output();
}
