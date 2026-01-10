import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadGiftModel } from '../modlels/readGift.model';
import { CreateGiftModel } from '../modlels/createGift.model';
import { UpdateGiftModel } from '../modlels/updateGift.model';



@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private readonly baseUrl = 'https://localhost:5001/api/Gift';

  constructor(private http: HttpClient) {}

  // =========================
  // GET: api/Gift
  // =========================
  getAll(): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(this.baseUrl);
  }

  // =========================
  // GET: api/Gift/byname/{name}
  // =========================
  getByName(name: string): Observable<ReadGiftModel> {
    return this.http.get<ReadGiftModel>(`${this.baseUrl}/byname/${name}`);
  }

  // =========================
  // GET: api/Gift/bynumberofbuyers/{num}
  // =========================
  getByNumberOfBuyers(num: number): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(
      `${this.baseUrl}/bynumberofbuyers/${num}`
    );
  }

  // =========================
  // GET: api/Gift/bydonor/{name}
  // =========================
  getByDonor(name: string): Observable<ReadGiftModel[]> {
    return this.http.get<ReadGiftModel[]>(
      `${this.baseUrl}/bydonor/${name}`
    );
  }

  // =========================
  // POST: api/Gift
  // (Admin בלבד)
  // =========================    
  create(gift: CreateGiftModel): Observable<any> {
    return this.http.post<any>(this.baseUrl, gift);
  }

  // =========================
  // PUT: api/Gift?name=xxx
  // (Admin בלבד)
  // =========================
  update(name: string, gift: UpdateGiftModel): Observable<any> {
    return this.http.put<any>(
    `${this.baseUrl}/${name}`,
      gift
    );
  }

  // =========================
  // DELETE: api/Gift/{name}
  // (Admin בלבד)
  // =========================
  delete(name: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${name}`);
  }
}

