import { ChangeDetectorRef, Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../models/readGift.model';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {  CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BasketService } from '../../../basket/services/basket-service';
import { AddToBasketModel } from '../../../basket/models/addToBasket.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-single-gift',
  standalone: true,
  imports: [ProgressSpinnerModule, Button,CommonModule,CardModule,RouterLink],
  templateUrl: './single-gift.html',
  styleUrl: './single-gift.scss',
})
export class SingleGift {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private giftService = inject(GiftService);
  private basketService = inject(BasketService);
  hasBasket : boolean = ! this.authService.isAdmin() && this.authService.isLoggedIn();
  isFullPage: boolean = false;

  @Input() gift:ReadGiftModel | null = null;

  ngOnInit() {
    
    this.isFullPage=false;
    this.setUpGift();
  }

  private setUpGift(){
    if(!this.gift){
      // If no gift is provided as input
      const giftName = this.route.snapshot.paramMap.get('name');
      
      if(!giftName){
        console.log("No gift name provided in route");
        return;
      }

      this.isFullPage = true;
      this.giftService.getGiftByName(giftName ).subscribe({
        next:(gift)=>{
          this.gift = gift;
          this.getWinnerName(this.gift);
          this.cdr.detectChanges();  
        },
        error:(error)=>{
          console.log("Error fetching gift:",error);
        }
      })
    }else{ // If gift is provided as input
      this.getWinnerName(this.gift);
    }
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
   
  public winnerName: string = '';

  getWinnerName(gift: ReadGiftModel | null): void {
    console.log("Fetching winner for gift:", gift?.name);
    this.giftService.getGiftWinner(gift?.name ?? '' ).subscribe({
      next: (winner) => {
        console.log(winner);
        this.winnerName = winner.winner;
        console.log("Winner name:", this.winnerName);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.winnerName = '';
        console.log(this.winnerName);
        this.cdr.detectChanges();
        console.log("Error fetching winner:", error);
      }
    });
  }
}