import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderResponse } from 'src/app/Module/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders: Order[] = [];
  showForm: boolean = false;
  updateOrderForm!: FormGroup;
  selectedProduct: any = null; 
  id: number=this.activatedRoute.snapshot.params["id"];
  selectedStatus: string = '';
  orderStatuses: string[] = ['Completed', 'Processing', 'PENDING', 'SHIPPED', 'CANCELLED'];
  constructor(private orderService: OrderService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.updateOrderForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      imageUrl: ['', Validators.required],
      quantity: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
    this.getAllOrders();

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']; // Récupérez l'ID dans ngOnInit
      //this.getOrderById(this.id);
      // Vous pouvez également exécuter d'autres actions dépendant de l'ID ici
    });
  }

  
  getOrderById(id: number) {
    this.orderService.getOrderById(id).subscribe((res) => {
      console.log(res);
      this.selectedProduct = res; // Assign the product details to selectedProduct
      this.updateOrderForm.patchValue({
        name: res.name,
        quantity: res.quantity,
        price: res.price,
        imageUrl: res.imageUrl,
        totalPrice: res.totalPrice,
        status: res.status,
        id: res.id,
      });
    });
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

  isModalOpen: boolean = false;

  toggleModalProduct(): void {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  toggleModalDelete() {
    const modalDelete = document.getElementById('deleteModal');
    if (modalDelete) {
      modalDelete.classList.toggle('hidden');
    }
  }

  closeModalDelete() {
    // Get the modal element
    const modalDelete = document.getElementById('deleteModal');
  
    // Check if modal exists before performing operations
    modalDelete?.classList.add('hidden');
    modalDelete?.setAttribute('aria-hidden', 'true');
  }

  updateOrderStatus(orderId: number, newStatus: string) {
    const orderToUpdate = this.orders.find((order: any) => order.orderId === orderId);
    if (orderToUpdate) {
      console.log('New status for order', orderId, ':', newStatus);
      this.orderService.updateOrderStatus(orderId, newStatus)
        .subscribe(
          updatedOrder => {
            console.log('Order status updated successfully:', updatedOrder);
            const index = this.orders.findIndex((order: any) => order.orderId === orderId);
            if (index !== -1) {
              this.orders[index] = updatedOrder;
              this.getAllOrders();
            }
          },
          error => {
            console.error('Error updating order status:', error);
          }
        );
    }
  }
  

}
