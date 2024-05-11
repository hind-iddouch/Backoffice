import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/Module/Category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  postCategoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  categories: Category[] = [];
  // Add a property to hold the current category being updated
  currentCategory: Category | null = null;
  

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router : Router
  ) { }

  ngOnInit() {
    this.postCategoryForm = this.fb.group({
      id: [null], 
      name: [null, [Validators.required]], 
    });
    this.updateCategoryForm = this.fb.group({
      id: [null], 
      name: [null, [Validators.required]], 
    });
    this.getAllCategories();
  }
  
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }

  setUpdateCategory(category: Category) {
    console.log('Category ID:', category.id); // Log the ID value
    this.currentCategory = category ; // Copy category object to prevent mutation
    this.updateCategoryForm.patchValue({
        id: category.id,
        name: category.name,
    });
}

updateCategories(): void {
    const id = this.updateCategoryForm.get('id')?.value;
    if (!id) {
        console.error('ID is null');
        return;
    }
    const updatedCategory: Category = {
        id: id,
        name: this.updateCategoryForm.get('name')?.value,
        subcategories: [],
    };
    this.categoryService.updateCategories(id, updatedCategory).subscribe(
        (res) => {
            console.log(res);
            this.router.navigateByUrl('/category');
        },
        (error) => {
            console.error(error);
            // Handle error appropriately
        }
    );
}


confirmDelete(): void {
  if (this.currentCategory) {
    this.deleteCategory(this.currentCategory.id);
  }
}

deleteCategory(id: number): void {
  console.log("Deleting category with ID:", id);
  this.categoryService.deleteCategory(id).subscribe(
    (res) => {
      console.log(res);
      this.categories = this.categories.filter((category) => category.id !== id);
      console.log("Categories after deletion:", this.categories);
      this.currentCategory = null;
    },
    (error) => {
      console.error(error);
      // Handle error appropriately
    }
  );
}

  postCategories(){
    console.log(this.postCategoryForm.value);
    this.categoryService.postCategories(this.postCategoryForm.value).subscribe((res)=>{
    console.log(res);
    this.router.navigateByUrl("/category");}
    )}
    toggleModal() {
      const modal = document.getElementById('createProductModal');
      if (modal) {
        modal.classList.toggle('hidden');
      }
    }
    toggleDropdown() {
      const modal = document.getElementById('apple-imac-27-dropdown');
      if (modal) {
        modal.classList.toggle('hidden');
      }
    }
    closeModal() {
      // Get the modal element
      const modal = document.getElementById('createProductModal');
    
      // Check if modal exists before performing operations
      modal?.classList.add('hidden');
      modal?.setAttribute('aria-hidden', 'true');
    }
  

}
