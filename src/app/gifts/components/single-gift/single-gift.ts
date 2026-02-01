import { ChangeDetectorRef, Component, inject, Input, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../models/readGift.model';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {  CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BasketService } from '../../../basket/services/basket-service';
import { AddToBasketModel } from '../../../basket/models/addToBasket.model';

@Component({
  selector: 'app-single-gift',
  standalone: true,
  imports: [ProgressSpinnerModule, Button,CommonModule,CardModule],
  templateUrl: './single-gift.html',
  styleUrl: './single-gift.scss',
})
export class SingleGift {
  route = inject(ActivatedRoute);
  private giftService = inject(GiftService);
  private basketService = inject(BasketService);
  cdr = inject(ChangeDetectorRef);

  @Input() gift:ReadGiftModel | null = null;
  // name: string  = this.gift?.name ?? ''
  ngOnInit() {
      this.cdr.detectChanges();   
  }

  addToCart(gift:ReadGiftModel | null){
    if(gift){
      const basket: AddToBasketModel = {amount:1,giftId:gift.id}
      this.basketService.addToBasket(basket).subscribe({
        next:()=>{
          console.log("Gift added to basket");
        },
        error:(error)=>{
          console.log("Error adding gift to basket:",error);
        }
      })
    }
  }
}
