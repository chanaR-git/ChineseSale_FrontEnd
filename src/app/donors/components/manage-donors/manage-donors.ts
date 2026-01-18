import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DonorService } from '../../services/donor-service';
import { ReadDonorModel } from '../../models/readDonor.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { UpdateDonorModel } from '../../models/updateDonor.model';
import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-manage-donors',
  imports: [ReactiveFormsModule, CommonModule, PopoverModule, TableModule, ButtonModule, TagModule],
  templateUrl: './manage-donors.html',
  styleUrl: './manage-donors.scss',
  providers:[MessageService, DonorService]
})
export class ManageDonors implements OnInit {
   constructor(
        private donorService: DonorService,
        private cdr: ChangeDetectorRef,
    ) {}



    @ViewChild('op') op!: Popover;

    private fb = inject(FormBuilder);
    
    donors: ReadDonorModel[] = [];
    donorForm!: FormGroup;
    selectedDonor: ReadDonorModel | null = null;

    ngOnInit() {
        this.donorService.getDonors().subscribe(donors =>
        { 
            this.donors = donors; 
            this.cdr.markForCheck();
        });
        this.donorForm = this.fb.group({
            name:  [this.selectedDonor?.name,Validators.maxLength(50)],
            email: [this.selectedDonor?.email, [Validators.email]],
            phone: [this.selectedDonor?.phone, [Validators.pattern(/^[0-9]{10}$/)]],
        });
    }

    displayDonor(event: Event, donor: ReadDonorModel) {


        if (this.selectedDonor?.id === donor.id) {
            this.op.hide();
            this.selectedDonor = null;
        } else {
            this.selectedDonor = donor;
            this.op.show(event);

            if (this.op.container) {
                this.op.align();
            }
        }
    }

    hidePopover() {
      if (this.donorForm.valid && this.selectedDonor !== null) {
        const updateDonor : UpdateDonorModel =this.donorForm.value;
        const id:number = this.selectedDonor!.id;
        this.donorService.updateDonor(id, updateDonor)
        .subscribe(
                (response) => {
                  console.log('תורם נוסף:', response);
                },
                (error) => console.log('שגיאה בעריכת תורם:', error)
              );
        }
        this.donorForm.reset();
        this.op.hide();
        //לא יעיל לשנות את כל הרשימה מהשרת, עדיף לעדכן מקומית רק את התורם ששונה
        this.donorService.getDonors().subscribe(donors =>
        { 
            this.donors = donors; 
            this.cdr.markForCheck();
        });
        
    }

}
