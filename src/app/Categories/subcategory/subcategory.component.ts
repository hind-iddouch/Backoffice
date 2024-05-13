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
  subcategories: Subcategory[] = [];
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
deleteSubCategory(id: number) {
  // No need for the confirmation dialog here
  this.subcategoryService.deleteSubcategory(id).subscribe(() => {
    this.subcategories = this.subcategories.filter((subcategory: any) => subcategory.id !== id);
  }, error => {
    console.error("Erreur lors de la suppression du category :", error);
  });
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
 

  isModalOpen: boolean = false;
  closeModalCate() {
    this.isModalOpen = false;
  }
  toggleModalProduct(): void {
    this.isModalOpen = !this.isModalOpen;
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

  // confirmDelete(): void {
  //   if (this.currentCategory) {
  //     this.deleteCategory(this.currentCategory.id);
  //   }
  // }
}
