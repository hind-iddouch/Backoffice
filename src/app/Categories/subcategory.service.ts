import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8002";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }

  getAllSubcategories(): Observable<any> {
    return this.http.get(BASIC_URL + "/PRODUCT-CATALOG-SERVICE/subcategories");
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/PRODUCT-CATALOG-SERVICE/subcategories/" + id);
  }
}
