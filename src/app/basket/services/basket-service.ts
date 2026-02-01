import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadBasketModel } from '../models/readBasket.model';
import { AddToBasketModel } from '../models/addToBasket.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private readonly baseUrl = `${environment.apiUrl}/api/Basket`;

  constructor(private http: HttpClient) {}

  /**
   * GET api/Basket/myBasket
   */
  getMyBasket(): Observable<ReadBasketModel[]> {
    return this.http.get<ReadBasketModel[]>(
      `${this.baseUrl}/myBasket`
    );
  }

  /**
   * POST api/Basket
   */
  addToBasket(model: AddToBasketModel): Observable<ReadBasketModel> {
    return this.http.post<ReadBasketModel>(this.baseUrl,model);
  }

  /**
   * PUT api/Basket/{id}/amount?newAmount=#
   */
  updateBasketAmount(
    basketId: number,
    newAmount: number
  ): Observable<ReadBasketModel | null> {

    // const params = new HttpParams()
    //   .set('newAmount', newAmount);

    return this.http.put<ReadBasketModel | null>(
      `${this.baseUrl}/${basketId}/amount?newAmount=${newAmount}`,{});
  }

  /**
   * DELETE api/Basket/{id}
   */
  deleteBasket(basketId: number): Observable<ReadBasketModel | null> {
    return this.http.delete<ReadBasketModel | null>(
      `${this.baseUrl}/${basketId}`
    );
  }
}
