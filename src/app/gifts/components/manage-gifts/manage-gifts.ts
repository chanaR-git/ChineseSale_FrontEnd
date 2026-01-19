import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../modlels/readGift.model';
import { CreateGiftModel } from '../../modlels/createGift.model';
import { UpdateGiftModel } from '../../modlels/updateGift.model';


@Component({
  selector: 'app-manage-gifts',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PopoverModule,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './manage-gifts.html',
  styleUrl: './manage-gifts.scss',
  providers: [MessageService, GiftService]
})

export class ManageGifts implements OnInit {
  
//   private giftService = inject(GiftService);
//   private cdr = inject(ChangeDetectorRef);
//   private fb = inject(FormBuilder);
//   private messageService = inject(MessageService);

//   @ViewChild('op') op!: Popover;
//   @ViewChild('addGiftPopover') addGiftPopover!: Popover;

//   gifts: ReadGiftModel[] = [];
//   giftForm!: FormGroup;
//   addGiftForm!: FormGroup;
//   selectedGift: ReadGiftModel | null = null;
//   showAddForm = false;

  ngOnInit() {
    // this.loadGifts();
    // this.initForms();
  }

//   private loadGifts() {
//     this.giftService.getGifts().subscribe(
//       (gifts) => {
//         this.gifts = gifts;
//         this.cdr.markForCheck();
//       },
//       (error) => {
//         console.error('Error loading gifts:', error);
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load gifts' });
//       }
//     );
//   }

//   private initForms() {
//     this.giftForm = this.fb.group({
//       name: ['', Validators.maxLength(50)],
//       description: ['', Validators.maxLength(200)],
//       categoryName: ['', Validators.maxLength(100)],
//       donorName: ['', Validators.maxLength(100)],
//       price: [10, [Validators.min(10), Validators.max(1000)]],
//       imagePath: ['', Validators.maxLength(200)],
//     });

//     this.addGiftForm = this.fb.group({
//       name: ['',[Validators.required, Validators.maxLength(100)]],
//       description: ['', Validators.maxLength(200)],
//       categoryname: [0, Validators.maxLength(50)],
//       donorname: [0, Validators.maxLength(50)],
//       price: [10, [Validators.min(10), Validators.max(1000)]],
//       imagePath: ['', Validators.maxLength(200)],
//     });
//   }

//   hidePopover() {
//     this.op.hide();
//   }

//   openAddGiftForm(event: Event) {
//     this.showAddForm = true;
//     this.addGiftPopover.show(event);
//   }

//   closeAddGiftForm() {
//     this.showAddForm = false;
//     this.addGiftPopover.hide();
//     this.addGiftForm.reset();
//   }

//   displayGift(event: Event, gift: ReadGiftModel) {
//     if (this.selectedGift?.name === gift.name) {
//       this.hidePopover();
//       this.selectedGift = null;
//     } else {
//       this.selectedGift = gift;
//       this.giftForm.patchValue({
//         name: gift.name,
//         description:gift.description,
//         categoryName: gift.categoryName,
//         donorName: gift.donorName,
//         price: gift.price,
//         imagePath: gift.imagePath
//       });
//       this.op.show(event);

//       if (this.op.container) {
//         this.op.align();
//       }
//     }
//   }

//   addGift() {
//     if (this.addGiftForm.valid) {
//       const newGift: CreateGiftModel = this.addGiftForm.value;
//       this.giftService.addGift(newGift).subscribe(
//         (response) => {
//           console.log('מתנה חדשה נוספה:', response);
//           this.gifts.push(response);
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה נוספה בהצלחה' });
//           this.closeAddGiftForm();
//           this.cdr.markForCheck();
//         },
//         (error) => {
//           console.error('Error adding gift:', error);
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'נכשלה הוספת מתנה' });
//         }
//       );
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'validation', detail: 'נא למלא את כל השדות הנדרשים במלואם' });
//     }
//   }

//   updateGift() {
//     // const updateGift: UpdateGiftModel = this.giftForm.value;
//     // if (this.giftForm.valid && this.selectedGift !== null) {
//     //   const name: string = this.selectedGift!.name;
//     //   this.giftService.updateGift(name, updateGift).subscribe(
//     //     (response) => {
//     //       console.log(' gift was updated:');
//     //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה עודכנה בהצלחה' });
//     //     },
//     //     (error) => {
//     //       console.error('Error updating gift:', error);
//     //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update gift' });
//     //     }
//     //   );
//     // }
//     // const index = this.gifts.findIndex(d => d.name === this.selectedGift?.name);
//     // if (index !== -1) {
//     //   this.gifts[index].name = updateGift.name ?? this.gifts[index].name;
//     //   this.gifts[index].description = updateGift.description ?? this.gifts[index].description;
//     //   this.gifts[index].categoryName = updateGift.categoryName ?? this.gifts[index].categoryName;
//     //   this.gifts[index].donorName = updateGift.donorName ?? this.gifts[index].donorName;
//     //   this.gifts[index].price = updateGift.price ?? this.gifts[index].price;
//     //   this.gifts[index].imagePath = updateGift.imagePath ?? this.gifts[index].imagePath;
//     // }
//     this.hidePopover();
//     this.giftForm.reset();
//   }

//   deleteGift() {
//     if (this.selectedGift !== null) {
//       const name: string = this.selectedGift!.name;
//       this.giftService.deleteGift(name).subscribe(
//         (response) => {
//           console.log('מתנה נמחקה:');
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה נמחקה בהצלחה' });
//         },
//         (error) => {
//           console.error('Error deleting gift:', error);
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'מחיקת מתנה נכשלה' });
//         }
//       );
//     }
//     const index = this.gifts.findIndex(d => d.name === this.selectedGift?.name);
//     if (index !== -1) {
//       this.gifts.splice(index, 1);
//     }
//     this.hidePopover();
//     this.giftForm.reset();
//   }
}