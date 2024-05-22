import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8002";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(BASIC_URL + "/orders/allOrders");
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/orders/" + orderId);
  }
  getOrderById(orderId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/orders/" +orderId);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    const url = `${BASIC_URL}/orders/${orderId}/status?newStatus=${newStatus}`;
    return this.http.patch(url, {}); // Assuming no body is needed
  }
  

}
