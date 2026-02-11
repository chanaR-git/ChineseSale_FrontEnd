import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCategoryModel } from '../models/createCategory.model';
import { ReadCategoryModel } from '../models/readCategory.model';
import { UpdateCategoryModel } from '../models/updateCategory.model';
import { environment } from '../../../enviorments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/api/Category`; 

  constructor(private http: HttpClient) { }

  // GET: קבלת כל הקטגוריות
  getAllCategories(): Observable<ReadCategoryModel[]> {
    return this.http.get<ReadCategoryModel[]>(this.apiUrl);
  }

  // POST: הוספת קטגוריה חדשה
  addCategory(category: CreateCategoryModel): Observable<ReadCategoryModel> {
    return this.http.post<ReadCategoryModel>(this.apiUrl, category);
  }

  // DELETE: מחיקת קטגוריה לפי מזהה
  deleteCategory(id: number): Observable<ReadCategoryModel> {
    return this.http.delete<ReadCategoryModel>(`${this.apiUrl}/${id}`);
  }

  // PUT: עדכון קטגוריה קיימת
  updateCategory(id: number, category: UpdateCategoryModel): Observable<ReadCategoryModel> {
    return this.http.put<ReadCategoryModel>(`${this.apiUrl}/${id}`, category);
  }
}