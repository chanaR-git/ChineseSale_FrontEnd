import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ReadBasketModel } from '../../models/readBasket.model';
import { BasketService } from '../../services/basket-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [ButtonModule, DrawerModule,CommonModule,CardModule,InputNumberModule,FormsModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket implements OnInit {
  private basketService = inject(BasketService);
  basketItems: ReadBasketModel[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.loading = true;
    this.basketService.getMyBasket().subscribe({
      
      next: (items) => {
        console.log(items);
        
        this.basketItems = items;
        this.loading = false;
      },
      error: () => {this.loading = false;console.log("error");
      }
    });
  }

  updateAmount(item: ReadBasketModel, delta: number): void {
    const newAmount = item.amount + delta;
    if (newAmount < 0) return;

    // שימוש בפונקציית העדכון מהסרוויס שסיפקת
    this.basketService.updateBasketAmount(item.id, newAmount).subscribe((updated) => {
      if (updated) {
        item.amount = updated.amount;
        console.log(("updated"));
        
      }
    });
  }

  removeItem(id: number): void {
    // שימוש בפונקציית המחיקה מהסרוויס שסיפקת
    this.basketService.deleteBasket(id).subscribe(() => {
      this.basketItems = this.basketItems.filter(item => item.id !== id);
    });
  }

  get totalSum(): number {
    return this.basketItems.reduce((acc, item) => acc + (item.gift.price * item.amount), 0);
  }
}
