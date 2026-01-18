import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadDonorModel } from '../models/readDonor.model';
import { CreateDonorModel } from '../models/createDonor.model';
import { UpdateDonorModel } from '../models/updateDonor.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
    providedIn: 'root'
})
export class DonorService {

    private readonly apiUrl = `${environment.apiUrl}/api/Donor`;

    constructor(private http: HttpClient) {}

    getDonors(): Observable<ReadDonorModel[]> {
        return this.http.get<ReadDonorModel[]>(this.apiUrl);
    }

    getDonorById(id: number): Observable<ReadDonorModel> {
        return this.http.get<ReadDonorModel>(`${this.apiUrl}/${id}`);
    }

    getDonorByName(name: string): Observable<ReadDonorModel> {
        return this.http.get<ReadDonorModel>(`${this.apiUrl}/byname/${name}`);
    }

    getDonorByEmail(email: string): Observable<ReadDonorModel> {
        return this.http.get<ReadDonorModel>(`${this.apiUrl}/byemail/${email}`);
    }

    getDonorByGift(giftId: number): Observable<ReadDonorModel> {
        return this.http.get<ReadDonorModel>(`${this.apiUrl}/bygift/${giftId}`);
    }

    addDonor(model: CreateDonorModel): Observable<ReadDonorModel> {
        return this.http.post<ReadDonorModel>(this.apiUrl, model);
    }

    updateDonor(id: number, model: UpdateDonorModel): Observable<ReadDonorModel> {
        return this.http.put<ReadDonorModel>(`${this.apiUrl}/${id}`, model);
    }

    deleteDonor(id: number): Observable<ReadDonorModel> {
        return this.http.delete<ReadDonorModel>(`${this.apiUrl}/${id}`);
    }
}
