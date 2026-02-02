import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { PurchaseService } from '../../services/massage-service';
import { ReadPurchaseModel } from '../../models/readPurchase.model';


@Component({
  selector: 'app-manage-purchases',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './manage-purchases.html',
  styleUrl: './manage-purchases.scss',
  providers: [MessageService]
})
export class ManagePurchases implements OnInit {
  private purchaseService = inject(PurchaseService);
  private cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  purchases: ReadPurchaseModel[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    this.loading = true;
    this.purchaseService.getBuyersDetails().subscribe({
      next: (data) => {
        this.purchases = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading purchases:', error);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'שגיאה', 
          detail: 'נכשל בטעינת נתוני רכישות' 
        });
        this.loading = false;
      }
    });
  }

  // פונקציות עזר למיון (אופציונלי - קוראות לשרת)
  sortByPrice() {
    this.purchaseService.getPurchasesSortedByPrice().subscribe(data => {
      this.purchases = data;
      this.cdr.markForCheck();
    });
  }

  sortByAmount() {
    this.purchaseService.getPurchasesSortedBySellings().subscribe(data => {
      this.purchases = data;
      this.cdr.markForCheck();
    });
  }
}