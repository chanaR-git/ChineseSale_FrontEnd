import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { single } from 'rxjs';
import { SingleGift } from '../single-gift/single-gift';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../models/readGift.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-all-gifts',
  standalone: true,
  imports: [SingleGift, CommonModule,ButtonModule],
  templateUrl: './all-gifts.html',
  styleUrl: './all-gifts.scss',
})
export class AllGifts {
  giftService = inject(GiftService);
  cdr = inject(ChangeDetectorRef)
  gifts: ReadGiftModel[] = [];


  filteredGifts: ReadGiftModel[] = [];
  selectedCategory: string = 'הכל';

  // router = inject(Router);

  ngOnInit() {
    this.giftService.getGifts().subscribe((gifts) => {
      this.gifts = gifts;
      this.filteredGifts = gifts;
      console.log(gifts);
      this.cdr.detectChanges()
    });
  }

  // onGiftClick(gift: ReadGiftModel) {
  //   console.log('Gift clicked:', gift);
  //   this.router.navigate([`/gifts/${gift.name}`]);
  // }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'הכל') {
      this.filteredGifts = this.gifts;
    } else {
      this.filteredGifts = this.gifts.filter(g => g.categoryName === category);
    }
  }

    getCategories(): string[] {
        const categories = this.gifts.map(g => g.categoryName).filter(c => !!c);
        return [...new Set(categories)];     
    }

  }
