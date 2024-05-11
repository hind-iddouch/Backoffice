import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '../subcategory.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/Module/Category';
import { Subcategory } from 'src/app/Module/Subcategory';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit{
  postSubCategoryForm!: FormGroup;
  updateSubCategoryForm!: FormGroup;
  showForm: boolean = false;
  subcategories: any = [];
  categories: Category[] = [];
   // Add a property to hold the current category being updated
   currentSubCategory: Subcategory | null = null;
  


  constructor(private subcategoryService: SubcategoryService, private categoryService: CategoryService,private fb: FormBuilder,
    private router : Router) { }

  ngOnInit() {

    this.postSubCategoryForm = this.fb.group({
       name: [null, [Validators.required]], 
       categoryId: [null, [Validators.required]],
    });
    this.updateSubCategoryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]], 
      categoryId: [null, [Validators.required]],
   });

    this.getAllSubcategories();
    this.getAllCategories();
 }

 
 postSubCategories(){
  console.log(this.postSubCategoryForm.value);
  this.subcategoryService.postSubCategories(this.postSubCategoryForm.value).subscribe((res)=>{
  console.log(res);
  this.router.navigateByUrl("/subcategory");}
  )}
 

  getAllSubcategories() {
    this.subcategoryService.getAllSubcategories().subscribe((res) => {
      console.log(res);
      this.subcategories = res;
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }
 
  setUpdateSubCategory(subcategory: Subcategory) {
    console.log('SubCategory ID:', subcategory.id); // Log the ID value
    this.currentSubCategory = subcategory ; // Copy category object to prevent mutation
    this.updateSubCategoryForm.patchValue({
        id: subcategory.id,
        name: subcategory.name,
    });
}

updateSubCategories(): void {
    const id = this.updateSubCategoryForm.get('id')?.value;
    if (!id) {
        console.error('ID is null');
        return;
    }
    const updatedSubCategory: Subcategory = {
      id: id,
      name: this.updateSubCategoryForm.get('name')?.value,
      categoryId: this.updateSubCategoryForm.get('categoryId')?.value,
      categoryName: ''
    };
    this.subcategoryService.updateSubCategories(id, updatedSubCategory).subscribe(
        (res) => {
            console.log(res);
            this.router.navigateByUrl('/subcategory');
        },
        (error) => {
            console.error(error);
            // Handle error appropriately
        }
    );
}
 deleteSubcategory() {
  if (this.currentSubCategory) {
    const id = this.currentSubCategory.id;
    this.subcategoryService.deleteSubcategory(id).subscribe(
      () => {
        console.log('Deleted successfully');
        this.subcategories = this.subcategories.filter((subcategory: Subcategory) => subcategory.id !== id);
        const modal = document.getElementById('deleteModal');
        modal?.classList.add('hidden');
        modal?.setAttribute('aria-hidden', 'true');
      },
      (error) => {
        console.error('Error deleting subcategory:', error);
      }
    );
  }
  }
  

  
  
  
  toggleModal() {
    const modal = document.getElementById('createsubcategoryModal');
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
    const modal = document.getElementById('createsubcategoryModal');
  
    // Check if modal exists before performing operations
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
  }
}
