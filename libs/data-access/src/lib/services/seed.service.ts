import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private fb = inject(FirebaseService);

  // Mock data for demo mode
  private mockData = {
    categories: [
      { name: 'Salary', icon: 'payments', color: '#10b981', type: 'income' },
      { name: 'Food', icon: 'restaurant', color: '#ef4444', type: 'expense' },
      { name: 'Rent', icon: 'home', color: '#3b82f6', type: 'expense' },
      { name: 'Investments', icon: 'trending_up', color: '#6366f1', type: 'income' },
    ],
    transactions: [
      { description: 'Monthly Salary', amount: 5000, category: 'Salary', date: new Date().toISOString(), type: 'income' },
      { description: 'Grocery Store', amount: 150, category: 'Food', date: new Date().toISOString(), type: 'expense' },
    ],
    budgets: [
      { categoryName: 'Food', limit: 600, spent: 150, period: '2026-04' },
      { categoryName: 'Rent', limit: 1200, spent: 1200, period: '2026-04' },
    ]
  };

  async seedData(userId: string) {
    // Check if already seeded (simplified for demo)
    console.log(`Seeding data for user: ${userId}`);
    
    for (const cat of this.mockData.categories) {
      await this.fb.setDocument(`users/${userId}/categories`, cat.name, cat);
    }

    for (const trans of this.mockData.transactions) {
      await this.fb.setDocument(`users/${userId}/transactions`, Math.random().toString(36).substring(7), trans);
    }

    for (const budget of this.mockData.budgets) {
      await this.fb.setDocument(`users/${userId}/budgets`, Math.random().toString(36).substring(7), budget);
    }
  }

  getMockData() {
    return of({
      categories: this.mockData.categories.map((c, i) => ({ ...c, id: `cat-${i}` })),
      transactions: this.mockData.transactions.map((t, i) => ({ ...t, id: `tr-${i}` })),
      budgets: this.mockData.budgets.map((b, i) => ({ ...b, id: `bud-${i}` })),
    });
  }
}
