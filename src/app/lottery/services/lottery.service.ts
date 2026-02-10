import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private apiUrl = `${environment.apiUrl}/api/Lottery`;

  constructor(private http: HttpClient) { }

  // הרצת הגרלה כללית
  runLottery(): Observable<any> {
    return this.http.post<any>(this.apiUrl, {});
  }

  // הרצת הגרלה למתנה ספציפית
  runLotteryForGift(giftName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${giftName}`, {});
  }

  // קבלת כל הזוכים
  getAllGiftWinners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/winners`);
  }

  // איפוס מכירה
  startNewSale(): Observable<string> {
    return this.http.put(`${this.apiUrl}/newSale`, {}, { responseType: 'text' });
  }

  // הורדת ZIP
  downloadWinnersZip(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download-winners-zip`, { responseType: 'blob' });
  }
}