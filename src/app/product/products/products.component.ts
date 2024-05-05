import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showForm: boolean = false;
  products:any=[];
  nom: string = "";
  

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      console.log(res);
      this.getAllProducts();
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  editProduct(id: number): void {
    // Here you can implement the logic to handle editing the product with the given id
    console.log('Editing product with id:', id);
  }
}
