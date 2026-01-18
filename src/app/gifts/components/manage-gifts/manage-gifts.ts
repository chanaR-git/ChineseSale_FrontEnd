import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../modlels/readGift.model';

@Component({
  selector: 'app-manage-gifts',
  imports: [PopoverModule,TableModule,ButtonModule,TagModule],
  templateUrl: './manage-gifts.html',
  styleUrl: './manage-gifts.scss',
  providers:[MessageService, GiftService]
})
export class ManageGifts implements OnInit {
   constructor(
        private GiftService: GiftService,
        private cdr: ChangeDetectorRef,
    ) {}

    @ViewChild('op') op!: Popover;

    gifts: ReadGiftModel[] | undefined;

    selectedGift: ReadGiftModel | undefined;

    ngOnInit() {
        this.GiftService.getGifts().subscribe(gifts=>this.gifts=gifts);
    }

    // displayGift(event, gift) {
    //     if (this.selectedGift?.id === gift.id) {
    //         this.op.hide();
    //         this.selectedGift = null;
    //     } else {
    //         this.selectedGift = gift;
    //         this.op.show(event);

    //         if (this.op.container) {
    //             this.op.align();
    //         }
    //     }
    // }

    // hidePopover() {
    //     this.op.hide();
    // }

}
