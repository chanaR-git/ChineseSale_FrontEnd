import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadGiftModel } from '../models/readGift.model';
import { CreateGiftModel } from '../models/createGift.model';
import { UpdateGiftModel } from '../models/updateGift.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private apiUrl = `${environment.apiUrl}/api/gift`;

  constructor(private http: HttpClient) { }

  // Get all gifts
  getGifts(): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(this.apiUrl);
  }

  // Get gift by name
  getGiftByName(name: string): Observable<ReadGiftModel> {
    return this.http.get<ReadGiftModel>(`${this.apiUrl}/byname/${name}`);
  }

  // Get gifts by number of buyers
  getGiftsByNumberOfBuyers(num: number): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(`${this.apiUrl}/bynumberofbuyers/${num}`);
  }

  // Get gifts by donor
  getGiftsByDonor(name: string): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(`${this.apiUrl}/bydonor/${name}`);
  }

  // Add a new gift (Admin only)
  addGift(gift: CreateGiftModel): Observable<ReadGiftModel> {
    // אין צורך להעביר headers ידנית, ה-interceptor מטפל בזה
    return this.http.post<ReadGiftModel>(this.apiUrl, gift);
  }

  // Update an existing gift (Admin only)
  updateGift(name: string, updatedGift: UpdateGiftModel): Observable<ReadGiftModel> {
    return this.http.put<ReadGiftModel>(`${this.apiUrl}/${name}`, updatedGift);
  }

  // Delete a gift (Admin only)
  deleteGift(name: string): Observable<ReadGiftModel> {
    return this.http.delete<ReadGiftModel>(`${this.apiUrl}/${name}`);
  }
}