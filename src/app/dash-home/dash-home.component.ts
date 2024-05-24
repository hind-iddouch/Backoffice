import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Users/customer.service';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { Customer } from '../Module/Customer';
import { Product } from '../Module/Product';
import { Order } from '../Module/Order';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit{
  constructor(
    private customerService: CustomerService, 
    private orderService:OrderService,
    private productService:ProductService
  ) { }

  totalUsers: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;

  customers:Customer[]=[];
  products:Product[]=[];
  orders:Order[]=[];


  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();
    this.getAllOrders();

   }
   getAllUsers(): void {
    this.customerService.getAllUsers().subscribe((res) => {
      this.customers = res;
      this.calculateTotals();
      this.incrementUsers();
    });
  }
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.calculateTotals();
      this.incrementProducts();
    });
  }
  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe((res) => {
     this.orders = res;
     this.calculateTotals();
     this.incrementOrders();
    });
  }
  calculateTotals(): void {
    this.totalUsers = this.customers.length;
    this.totalOrders = this.orders.length;
    this.totalProducts = this.products.length;
    //this.totalSales = this.orders.reduce((acc, order) => acc + order.amount, 0);
  }

  incrementUsers(): void {
    let count = 0;
    const incrementInterval = setInterval(() => {
      count++;
      if (count >= this.customers.length) {
        clearInterval(incrementInterval);
      }
      this.totalUsers = count;
    }, 100);
  }
  incrementProducts(): void {
    let count = 0;
    const incrementInterval = setInterval(() => {
      count++;
      if (count >= this.products.length) {
        clearInterval(incrementInterval);
      }
      this.totalProducts = count;
    }, 100);
  }
  incrementOrders(): void {
    let count = 0;
    const incrementInterval = setInterval(() => {
      count++;
      if (count >= this.orders.length) {
        clearInterval(incrementInterval);
      }
      this.totalOrders = count;
    }, 100);
  }

}
