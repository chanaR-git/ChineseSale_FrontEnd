import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DonorService } from '../../services/donor-service';
import { ReadDonorModel } from '../../models/readDonor.model';
import { CreateDonorModel } from '../../models/createDonor.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateDonorModel } from '../../models/updateDonor.model';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-donors',
  standalone: true,
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
  templateUrl: './manage-donors.html',
  styleUrl: './manage-donors.scss',
  providers: [MessageService, DonorService]
})
export class ManageDonors implements OnInit {
  constructor(
    private donorService: DonorService,
    private cdr: ChangeDetectorRef,
  ) {}

  @ViewChild('op') op!: Popover;
  @ViewChild('addDonorPopover') addDonorPopover!: Popover;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  donors: ReadDonorModel[] = [];
  donorForm!: FormGroup;
  addDonorForm!: FormGroup;
  selectedDonor: ReadDonorModel | null = null;
  showAddForm = false;

  ngOnInit() {
    this.loadDonors();
    this.initForms();
  }

  private loadDonors() {
    this.donorService.getDonors().subscribe(
      (donors) => {
        this.donors = donors;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error loading donors:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load donors' });
      }
    );
  }

  private initForms() {
    this.donorForm = this.fb.group({
      name: ['', Validators.maxLength(50)],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    });

    this.addDonorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  hidePopover() {
    this.op.hide();
  }

  openAddDonorForm(event: Event) {
    this.showAddForm = true;
    this.addDonorPopover.show(event);
  }

  closeAddDonorForm() {
    this.showAddForm = false;
    this.addDonorPopover.hide();
    this.addDonorForm.reset();
  }

  displayDonor(event: Event, donor: ReadDonorModel) {
    if (this.selectedDonor?.id === donor.id) {
      this.hidePopover();
      this.selectedDonor = null;
    } else {
      this.selectedDonor = donor;
      this.donorForm.patchValue({
        name: donor.name,
        email: donor.email,
        phone: donor.phone
      });
      this.op.show(event);

      if (this.op.container) {
        this.op.align();
      }
    }
  }

  addDonor() {
    if (this.addDonorForm.valid) {
      const newDonor: CreateDonorModel = this.addDonorForm.value;
      this.donorService.addDonor(newDonor).subscribe(
        (response) => {
          console.log('תורם חדש נוסף:', response);
          this.donors.push(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Donor added successfully' });
          this.closeAddDonorForm();
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error adding donor:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add donor' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please fill all required fields correctly' });
    }
  }

  updateDonor() {
    const updateDonor: UpdateDonorModel = this.donorForm.value;
    if (this.donorForm.valid && this.selectedDonor !== null) {
      const id: number = this.selectedDonor!.id;
      this.donorService.updateDonor(id, updateDonor).subscribe(
        (response) => {
          console.log('תורם עודכן:');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Donor updated successfully' });
        },
        (error) => {
          console.error('Error updating donor:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update donor' });
        }
      );
    }
    const index = this.donors.findIndex(d => d.id === this.selectedDonor?.id);
    if (index !== -1) {
      this.donors[index].name = updateDonor.name ?? this.donors[index].name;
      this.donors[index].email = updateDonor.email ?? this.donors[index].email;
      this.donors[index].phone = updateDonor.phone ?? this.donors[index].phone;
    }
    this.hidePopover();
    this.donorForm.reset();
  }

  deleteDonor() {
    if (this.selectedDonor !== null) {
      const id: number = this.selectedDonor!.id;
      this.donorService.deleteDonor(id).subscribe(
        (response) => {
          console.log('תורם נמחק:');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Donor deleted successfully' });
        },
        (error) => {
          console.error('Error deleting donor:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete donor' });
        }
      );
    }
    const index = this.donors.findIndex(d => d.id === this.selectedDonor?.id);
    if (index !== -1) {
      this.donors.splice(index, 1);
    }
    this.hidePopover();
    this.donorForm.reset();
  }
}