import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Subcategory } from 'src/app/Module/Subcategory';
import { SubcategoryService } from 'src/app/Categories/subcategory.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showForm: boolean = false;
  products:any=[];
  nom: string = "";
  imageUrl:string= '';
  postProductForm!: FormGroup;
  subcategories: Subcategory[] = [];

  constructor(
    private productService: ProductService, 
    private fb: FormBuilder,
    private router : Router,
    private SubcategoryService: SubcategoryService,
    private fireStorage:AngularFireStorage
  ) { }

    
  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  /*async previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = 'yt/${file.name}'
      const uploadTask= await this.fireStorage.upload(path,file)
      const url= await uploadTask.ref.getDownloadURL()
      console.log(url)
      }
  }
  */
  ngOnInit() {
    this.postProductForm = this.fb.group({
      name: [null, [Validators.required]], 
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      timeToPrepareInMinute: [null, [Validators.required]],
      availability: [null, [Validators.required]],
      id: [null, [Validators.required]],
    });
    this.getAllProducts();
    this.getAllSubcategories();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }
  getAllSubcategories() {
    this.SubcategoryService.getAllSubcategories().subscribe((res) => {
      console.log(res);
      this.subcategories = res;
    });
  }
  
  postProduct(){
    console.log(this.postProductForm.value);
    this.productService.postProduct(this.postProductForm.value).subscribe((res)=>{
    console.log(res);
    this.router.navigateByUrl("/products");}
    )}

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

  isModalOpen: boolean = false;

  toggleModalProduct(): void {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  isModalEditOpen: boolean = false;
  toggleModalEdit(): void {
    this.isModalEditOpen = !this.isModalEditOpen;
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

  
  


}
