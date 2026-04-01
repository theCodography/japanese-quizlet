import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DecksListComponent } from './pages/decks-list/decks-list.component';
import { DeckDetailComponent } from './pages/deck-detail/deck-detail.component';
import { LearnComponent } from './pages/learn/learn.component';
import { GrammarLibraryComponent } from './pages/grammar-library/grammar-library.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'decks', component: DecksListComponent },
      { path: 'decks/:id', component: DeckDetailComponent },
      { path: 'grammar', component: GrammarLibraryComponent },
    ]
  },
  { path: 'learn/:id', component: LearnComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
