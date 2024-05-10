import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '../subcategory.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/Module/Category';

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
  


  constructor(private subcategoryService: SubcategoryService, private categoryService: CategoryService,private fb: FormBuilder,
    private router : Router) { }

  ngOnInit() {

    this.postSubCategoryForm = this.fb.group({
       name: [null, [Validators.required]], 
       categoryId: [null, [Validators.required]],
    });
    this.updateSubCategoryForm = this.fb.group({
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
 
  deleteSubcategory(id: number) {
    this.subcategoryService.deleteSubcategory(id).subscribe((res) => {
      console.log(res);
      this.getAllSubcategories();
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
  closeModal() {
    // Get the modal element
    const modal = document.getElementById('createsubcategoryModal');
  
    // Check if modal exists before performing operations
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
  }
}
