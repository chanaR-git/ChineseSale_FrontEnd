import { ChangeDetectorRef, Component, inject, Input, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../modlels/readGift.model';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {  CardModule } from 'primeng/card';

@Component({
  selector: 'app-single-gift',
  imports: [Button,CommonModule,CardModule],
  templateUrl: './single-gift.html',
  styleUrl: './single-gift.scss',
})
export class SingleGift {
  route = inject(ActivatedRoute);
  giftService = inject(GiftService);
  cdr = inject(ChangeDetectorRef);

  @Input() gift:ReadGiftModel | null = null;
  // name: string  = this.gift?.name ?? ''
  ngOnInit() {
      this.cdr.detectChanges();   
  }
}
