import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { GiftService } from '../../services/gift.service';
import { ReadGiftModel } from '../../models/readGift.model';
import { CreateGiftModel } from '../../models/createGift.model';
import { UpdateGiftModel } from '../../models/updateGift.model';
import { DonorService } from '../../../donors/services/donor-service';
import { ReadDonorModel } from '../../../donors/models/readDonor.model';
import { AutoCompleteModule } from 'primeng/autocomplete';



@Component({
    selector: 'app-manage-gifts',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        PopoverModule,
        TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,
        ToastModule,
        AutoCompleteModule,
        FormsModule
    ],
    templateUrl: './manage-gifts.html',
    styleUrl: './manage-gifts.scss',
    providers: [MessageService, GiftService]
})

export class ManageGifts implements OnInit {

    private giftService = inject(GiftService);

    private cdr = inject(ChangeDetectorRef);
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);

    @ViewChild('op') op!: Popover;
    @ViewChild('addGiftPopover') addGiftPopover!: Popover;

    gifts: ReadGiftModel[] = [];
    
    giftForm!: FormGroup;
    addGiftForm!: FormGroup;
    updateGiftForm!: FormGroup;
    selectedGift: ReadGiftModel | null = null;
    showAddForm = false;

    //donor
    private donorService = inject(DonorService);
    donors:ReadDonorModel[]=[];
    filteredDonors: any[] = [];
    selectedDonor: ReadDonorModel | null = null;
    donorDisplayControl = new FormControl<ReadDonorModel | null>(null);


    ngOnInit() {
        this.loadGifts();
        this.loadDonors();
        this.initForms();
    }

    private loadGifts() {
        this.giftService.getGifts().subscribe(
            (gifts) => {
                this.gifts = gifts;
                this.cdr.markForCheck();
            },
            (error) => {
                console.error('Error loading gifts:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load gifts' });
            }
        );
    }

    
    
    private initForms() {
        this.addGiftForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.maxLength(200)]],
            categoryId: [0, [Validators.required]],
            donorId: [0, [Validators.required]],
            price: [10, [Validators.required, Validators.min(10), Validators.max(1000)]],
            imagePath: ['', [Validators.required, Validators.maxLength(200)]],
        });

        this.updateGiftForm = this.fb.group({
            name: ['', [Validators.maxLength(100)]],
            description: ['', Validators.maxLength(200)],
            categoryId: [0],
            price: [10, [Validators.min(10), Validators.max(1000)]],
            imagePath: ['', Validators.maxLength(200)],
        });
    }
    
    hidePopover() {
        this.op.hide();
    }

    openAddGiftForm(event: Event) {
        this.showAddForm = true;
        this.addGiftPopover.show(event);
    }
    
    closeAddGiftForm() {
        this.showAddForm = false;
        this.addGiftPopover.hide();
        this.addGiftForm.reset();
    }
    
    displayGift(event: Event, gift: ReadGiftModel) {
        if (this.selectedGift?.name === gift.name) {
            this.hidePopover();
            this.selectedGift = null;
        } else {
            this.selectedGift = gift;
            this.updateGiftForm.patchValue({
                name: gift.name,
                description: gift.description,
                categoryId: gift.categoryId,
                price: gift.price,
                imagePath: gift.imagePath
            });
            this.op.show(event);
            
            if (this.op.container) {
                this.op.align();
            }
        }
    }
    
    addGift() {
        if (this.addGiftForm.valid) {
            const newGift: CreateGiftModel = this.addGiftForm.value;
            this.giftService.addGift(newGift).subscribe(
                (response) => {
                    console.log('מתנה חדשה נוספה:', response);
                    this.gifts.push(response);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה נוספה בהצלחה' });
                    this.closeAddGiftForm();
                    this.cdr.markForCheck();
                },
                (error) => {
                    console.error('Error adding gift:', error);
                    if (error.status === 400) {
                        if (error.error === "donor does not exist") {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: ' אויש, אין תורם כזה...' });
                        }
                        else if (error.error === "Category does not exist") {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: ' אויש, אין קטגוריה כזו...' });
                        }
                        else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: '  הפרטים שהזנת לא נכונים. נא לבדוק...' });
                        }
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'נכשלה הוספת מתנה' });
                    }
                    return;
                }
            );
        } else {
            this.messageService.add({ severity: 'warn', summary: 'validation', detail: 'נא למלא את כל השדות הנדרשים במלואם' });
        }
    }
    
    updateGift() {
        const updateGift: UpdateGiftModel = this.updateGiftForm.value;
        if (this.updateGiftForm.valid && this.selectedGift !== null) {
            const name: string = this.selectedGift!.name;
            this.giftService.updateGift(name, updateGift).subscribe(
                (response) => {
                    console.log(' gift was updated:');
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה עודכנה בהצלחה' });
                    const index = this.gifts.findIndex(d => d.name === this.selectedGift?.name);
                    if (index !== -1) {
                        this.gifts[index].name = updateGift.name ?? this.gifts[index].name;
                        this.gifts[index].description = updateGift.description ?? this.gifts[index].description;
                        this.gifts[index].categoryId = updateGift.categoryId ?? this.gifts[index].categoryId;
                        this.gifts[index].price = updateGift.price ?? this.gifts[index].price;
                        this.gifts[index].imagePath = updateGift.imagePath ?? this.gifts[index].imagePath;
                    }
                },
                (error) => {
                    console.error('Error updating gift:', error);
                    if (error.status === 400) {
                        if (error.error === "donor does not exist") {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: ' אויש, אין תורם כזה...' });
                        }
                        else if (error.error === "Category does not exist") {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: ' אויש, אין קטגוריה כזו...' });
                        }
                        else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: '  הפרטים שהזנת לא נכונים. נא לבדוק...' });
                        }
                    } else
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'נכשלה הוספת מתנה' });

                        return;
                    }
            );
        }
        
        this.hidePopover();
        this.giftForm.reset();
    }
    
    deleteGift() {
        if (this.selectedGift !== null) {
            const name: string = this.selectedGift!.name;
            this.giftService.deleteGift(name).subscribe(
                (response) => {
                    console.log('מתנה נמחקה:');
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'מתנה נמחקה בהצלחה' });
                },
                (error) => {
                    console.error('Error deleting gift:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'מחיקת מתנה נכשלה' });
                }
            );
        }
        const index = this.gifts.findIndex(d => d.name === this.selectedGift?.name);
        if (index !== -1) {
            this.gifts.splice(index, 1);
        }
        this.hidePopover();
        this.giftForm.reset();
    }

    
    //donors
    //find the way to show the selected donor name in the autocomplete input after selection

    private loadDonors() {
        this.donorService.getDonors().subscribe(d => {
            this.donors = d;
            this.cdr.markForCheck();
        });
    }

    filterDonors(event: any) {
        const query = event.query.toLowerCase();
        this.filteredDonors = this.donors.filter(donor => donor.name.toLowerCase().includes(query));
    }

    onDonorSelect(event: any) {
        const donor: ReadDonorModel = event.value;
        this.selectedDonor = donor;
        this.addGiftForm.patchValue({ donorId: donor.id });
        this.donorDisplayControl.setValue(event); 
    }

    //categories
    //create categoey models, service and load categories method filterCategories(event: any)  and onCategorySelect






}