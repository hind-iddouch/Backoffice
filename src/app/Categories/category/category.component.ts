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
  

  constructor(private categoryService: CategoryService,private fb: FormBuilder,
    private router : Router) { }

  ngOnInit() {
    this.postCategoryForm = this.fb.group({
      id: [null, [Validators.required]], 
      name: [null, [Validators.required]], 
    });
    this.updateCategoryForm = this.fb.group({
      id: [null, [Validators.required]], 
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
  updateCategory(): void {
    const id = this.updateCategoryForm.get('id')?.value;
    const updatedCategory: Category = this.updateCategoryForm.value;
    this.categoryService.updateCategory(id, updatedCategory).subscribe(
        (res: Category) => {
            // Update the category in the list
            const index = this.categories.findIndex(c => c.id === id);
            if (index !== -1) {
                this.categories[index] = res;
            }
            
           
        }
    );
}
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.getAllCategories();
    });
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
