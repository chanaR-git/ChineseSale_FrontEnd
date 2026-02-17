import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getGifts(): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(this.apiUrl);
  }

  getGiftsPaged(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());
    
    return this.http.get<any>(`${this.apiUrl}/paged`, { params });
  }

  getGiftByName(name: string): Observable<ReadGiftModel> {
    return this.http.get<ReadGiftModel>(`${this.apiUrl}/byname/${name}`);
  }

  getGiftsByNumberOfBuyers(num: number): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(`${this.apiUrl}/bynumberofbuyers/${num}`);
  }

  getGiftsByDonor(name: string): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(`${this.apiUrl}/bydonor/${name}`);
  }

  addGift(gift: CreateGiftModel): Observable<ReadGiftModel> {
    return this.http.post<ReadGiftModel>(this.apiUrl, gift);
  }

  updateGift(name: string, updatedGift: UpdateGiftModel): Observable<ReadGiftModel> {
    return this.http.put<ReadGiftModel>(`${this.apiUrl}/${name}`, updatedGift);
  }

  deleteGift(name: string): Observable<ReadGiftModel> {
    return this.http.delete<ReadGiftModel>(`${this.apiUrl}/${name}`);
  }

  getGiftWinner(giftName: string): Observable<{winner:string}> {
    return this.http.get<{winner:string}>(`${this.apiUrl}/${giftName}/winner`);
  }

  uploadGiftImage(giftId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${giftId}/image`, formData);
  }

  downloadGiftImage(giftId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${giftId}/image`, { responseType: 'blob' });
  }

  getGiftImagePublic(giftId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${giftId}/image/public`, { responseType: 'blob' });
  }
}