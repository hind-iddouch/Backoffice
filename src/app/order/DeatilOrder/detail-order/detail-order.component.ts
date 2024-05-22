import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from 'src/app/Module/Order';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit{
  order:  OrderResponse = {} as OrderResponse; // Change to 'any' type if the structure of your order object is not fixed
  

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['orderId'];
    
    this.getOrderDetails(orderId);
  }

  getOrderDetails(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe((res) => {
      console.log(res);
      this.order = res;
    });
  }
}
