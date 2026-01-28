import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { single } from 'rxjs';
import { SingleGift } from '../single-gift/single-gift';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../modlels/readGift.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-gifts',
  imports: [SingleGift,CommonModule],
  templateUrl: './all-gifts.html',
  styleUrl: './all-gifts.scss',
})
export class AllGifts {
  giftService = inject(GiftService);
  cdr = inject(ChangeDetectorRef)
  gifts:ReadGiftModel[]  = [];

  ngOnInit() {
    this.giftService.getGifts().subscribe((gifts) => {
      this.gifts = gifts;
      console.log(gifts);
      this.cdr.detectChanges()
    });
  }

}
