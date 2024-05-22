import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/Module/Category';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  postCategoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  categories: Category[] = [];
  // Add a property to hold the current category being updated
  currentCategory: Category | null = null;
  openAddCategoryModal() {
    this.isAddModalOpen = true;
  }
  
  // In your TypeScript file
  deleteCategoryId: number | null = null;
  category: any;

  setDeleteCategory(id: number): void {
    this.deleteCategoryId = id;
  }

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
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
    this.currentCategory = category; // Copy category object to prevent mutation

    this.updateCategoryForm.patchValue({
      id: category.id,
      name: category.name,
    });

  }
  //Add Modal Attrribute
  isAddModalOpen: boolean = false;
  //Edit Modal Attribute
  isEditModalOpen: boolean = false;
  //Delete Modal Attribute
  isDeleteModalOpen: boolean = false;
  //Details Modal Attribute
  isDetailsModalOpen: boolean = false;
  // Variable to track selected field ID
  selectedCategoryid: number | undefined;

  //Toggle Edit Modal
  closeModal(str: string, id: number) {

    switch (str) {

      case 'add':
        this.isAddModalOpen = !this.isAddModalOpen;
        break;

      case 'edit':
        console.log(str, id);
        this.isEditModalOpen = !this.isEditModalOpen;
        this.selectedCategoryid = id;
        this.currentCategory = this.categories.find(sub => sub.id === id) || null;
        if (this.currentCategory) {
          this.updateCategoryForm.patchValue({
            id: this.currentCategory.id,
            name: this.currentCategory.name,
          });
        }
        console.log(this.updateCategoryForm.value);
        break;
      case 'delete':
        this.isDeleteModalOpen = !this.isDeleteModalOpen;
        console.log("toggle confirm delete called");
        this.selectedCategoryid = id;
        break;




      case 'details':
        this.isDetailsModalOpen = !this.isDetailsModalOpen;
        console.log("toggle details called");
        this.selectedCategoryid = id;
        break;

      case 'cancel':
        this.selectedCategoryid = 0;
        this.isDeleteModalOpen = false;
        break;

      case 'alert':
        this.deleteAlert = !this.deleteAlert;
        break;
    };

  }



 // EDIT Stuff


 confirmUpdate(editForm: FormGroup, id: number): void {
  this.selectedCategoryid = id;

  this.categoryService.updateCategories(id, editForm.value).subscribe({
    next: () => {
      // Update successful, reset selected field and hide modal
      this.selectedCategoryid = 0;
      this.getAllCategories();
      this.closeModal('edit', id); // Close modal after update
    },
    error: (error) => {
      // Handle error if update fails
      console.error('Error updating field:', error);
    }
  });
}

  closeDeleteModal(): void {
    this.deleteCategoryId = null;
  }


  postCategories() {
    console.log(this.postCategoryForm.value);
    this.categoryService.postCategories(this.postCategoryForm.value).subscribe((res) => {
      console.log(res);
      this.getAllCategories();

      this.closeModalCate();
    }

    )
    this.postCategoryForm = this.fb.group({
      id: [null],
      name: [null]
    });
  }


  isModalOpen: boolean = false;

  toggleModalProduct(): void {
    this.isModalOpen = !this.isModalOpen;
  }
 

  isModalEditOpen: boolean = false;
  toggleModalEdit(): void {
    this.isModalEditOpen = !this.isModalEditOpen;
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  closeModalCate() {
  this.isAddModalOpen = false; // Set isAddModalOpen to false to close the modal
  this.postCategoryForm = this.fb.group({
    id: [null],
    name: [null]
  });
}


  // Delete Stuff
  deleteAlert: boolean = false;
  isConfirmDelete: boolean = false;

  // Method to trigger delete confirmation modal for the selected field
  confirmDelete(id: number): void {
    console.log("loool")
    this.selectedCategoryid = id;
    this.isConfirmDelete = !this.isConfirmDelete;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {

        // Delete successful, reset selected field and hide modal
        this.selectedCategoryid = 0;
        this.getAllCategories();
        this.closeModal('delete', id);
        console.log('Category deleted successfully');
      },
      error: (error) => {
        // Handle error if deletion fails
        console.error('Error deleting field:', error);
      }
    });

    this.selectedCategoryid = 0;
  }

  toggleConfirmDelete(id: number) {
    console.log("toggle confirm delete called");
    this.selectedCategoryid = id;
    this.isConfirmDelete = !this.isConfirmDelete;
  }

  // Method to cancel delete confirmation modal
  cancelDelete(): void {
    this.selectedCategoryid = 0;
    this.isConfirmDelete = !this.isConfirmDelete;
  }

  closeDeleteAlert() {
    this.deleteAlert = !this.deleteAlert;
  }

  

}
