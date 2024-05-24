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
  showSuccessDeleteAlert: boolean = false;
  showErrorDeleteAlert: boolean = false;
  showSuccessUpdateAlert: boolean = false;
  showErrorUpdateAlert: boolean = false;
  //pagination
 page = 0;
 pageSize = 5; 
 totalItems = 0;
 paginatedCategory: Category[] = [];
 currentPage: number = 1;
 itemsPerPage: number = 5;
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
      this.updatePaginatedProducts();
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
      this.selectedCategoryid = 0;
      this.getAllCategories();
      this.closeModal('edit', id); 
      this.showSuccessUpdateAlert = true;
      setTimeout(() => {
        this.showSuccessUpdateAlert = false;
      }, 2500);
    },
    error: (error) => {
      // Handle error if update fails
      console.error('Error updating field:', error);
      this.showErrorUpdateAlert = true;
      setTimeout(() => {
        this.showErrorUpdateAlert = false;
      }, 2500);
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
        this.showSuccessDeleteAlert = true;
        setTimeout(() => {
          this.showSuccessDeleteAlert = false;
        }, 2500);
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
  loadProductsWithPagiantion() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
  
      //this.loadProductsWithPagiantion();
      console.log("products loaded ",this.categories);
      this.updatePaginatedProducts();
  
    })
  }
  onPageChange(): void {
    // Réagissez au changement de page
    this.updatePaginatedProducts();
  }
  
  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategory = this.categories.slice(startIndex, endIndex);
  }
  goToPage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedProducts();
  }
  
  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
  }
  
  getPaginationArray(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  

}
