
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviorments/enviorment';
import { ReadPurchaseModel } from '../models/readPurchase.model';
import { CreatePurchaseModel } from '../models/createPurchase.model';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private http = inject(HttpClient);
  // הכתובת api/Purchases כפי שמופיעה ב-[Route("api/[controller]")] בשרת
  private apiUrl = `${environment.apiUrl}/api/Purchases`;

  /**
   * קבלת פרטי כל הרוכשים (Admin בלבד)
   * GET api/Purchases/buyers
   */
  getBuyersDetails(): Observable<ReadPurchaseModel[]> {
    return this.http.get<ReadPurchaseModel[]>(`${this.apiUrl}/buyers`);
  }

  /**
   * חיפוש רכישות לפי שם מתנה (Admin בלבד)
   * GET api/Purchases/gift/{name}
   */
  getPurchasesByGift(giftName: string): Observable<ReadPurchaseModel[]> {
    return this.http.get<ReadPurchaseModel[]>(`${this.apiUrl}/gift/${giftName}`);
  }

  /**
   * קבלת רכישות ממוינות לפי כמות מכירות (Admin בלבד)
   * GET api/Purchases/sorted/sellings
   */
  getPurchasesSortedBySellings(): Observable<ReadPurchaseModel[]> {
    return this.http.get<ReadPurchaseModel[]>(`${this.apiUrl}/sorted/sellings`);
  }

  /**
   * קבלת רכישות ממוינות לפי מחיר (Admin בלבד)
   * GET api/Purchases/sorted/price
   */
  getPurchasesSortedByPrice(): Observable<ReadPurchaseModel[]> {
    return this.http.get<ReadPurchaseModel[]>(`${this.apiUrl}/sorted/price`);
  }

  /**
   * ביצוע רכישה חדשה (User בלבד)
   * POST api/Purchases
   */
  purchase(dto: CreatePurchaseModel): Observable<ReadPurchaseModel> {
    return this.http.post<ReadPurchaseModel>(this.apiUrl, dto);
  }
}