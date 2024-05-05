import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders: any = [];
  showForm: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      console.log(res);
      this.orders = res;
    });
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe((res) => {
      console.log(res);
      this.getAllOrders();
    });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  editOrder(id: number): void {
    // Here you can implement the logic to handle editing the product with the given id
    console.log('Editing product with id:', id);
  }

}
