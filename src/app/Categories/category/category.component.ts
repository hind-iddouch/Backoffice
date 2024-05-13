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
  category: Category | null = null;
  // Add a property to hold the current category being updated
  currentCategory: Category | null = null;
  // In your TypeScript file
deleteCategoryId: number | null = null;

setDeleteCategory(id: number): void {
    this.deleteCategoryId = id;
}

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

    const modalupdate = document.getElementById('updateProductModal');
  
    // Check if modal exists before performing operations
    modalupdate?.classList.add('hidden');
    modalupdate?.setAttribute('aria-hidden', 'true');
}



deleteCategory(id: number): void {
  if (this.deleteCategoryId) {
      this.categoryService.deleteCategory(this.deleteCategoryId).subscribe(() => {
          // Filter out the deleted category from the list
          this.categories = this.categories.filter(category => category.id !== this.deleteCategoryId);
          // Reset the deleteCategoryId after successful deletion
          this.deleteCategoryId = null;
      }, error => {
          console.error("Error deleting category:", error);
      });
  }
}

closeDeleteModal(): void {
  this.deleteCategoryId = null;
}


  postCategories(){
    console.log(this.postCategoryForm.value);
    this.categoryService.postCategories(this.postCategoryForm.value).subscribe((res)=>{
    console.log(res);
    this.loadCategories();
    this.router.navigateByUrl("/category");
  }

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


     // Variable to control the visibility of the modal
  isModalVisible: boolean = false;

  // Function to toggle the visibility of the modal
  toggleModalUpdate() {
    const modalupdate = document.getElementById('updateProductModal');
    if (modalupdate) {
      modalupdate.classList.toggle('hidden');
    }
  }
  toggleModalDelete() {
    const modalDelete = document.getElementById('deleteModal');
    if (modalDelete) {
      modalDelete.classList.toggle('hidden');
    }
  }

  closeModalUpdate() {
    // Get the modal element
    const modalupdate = document.getElementById('updateProductModal');
  
    // Check if modal exists before performing operations
    modalupdate?.classList.add('hidden');
    modalupdate?.setAttribute('aria-hidden', 'true');
  }
  closeModalDelete() {
    // Get the modal element
    const modalDelete = document.getElementById('deleteModal');
  
    // Check if modal exists before performing operations
    modalDelete?.classList.add('hidden');
    modalDelete?.setAttribute('aria-hidden', 'true');
  }
  
  
  isModalOpen: boolean = false;

  toggleModalProduct(): void {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModalCate() {
    this.isModalOpen = false;
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

  deletesCategory(id: number) {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce Category ?");
    if (isConfirmed) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter((category: any) => category.id !== id);
        // Vous pouvez recharger uniquement les données au lieu de recharger toute la page
        // this.getALlProducts();
      }, error => {
        console.error("Erreur lors de la suppression du category :", error);
      });
    }
}

}
