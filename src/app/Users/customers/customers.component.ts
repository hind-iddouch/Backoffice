import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {



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
  toggleModalUpdate() {
    const modalupdate = document.getElementById('updateProductModal');
    if (modalupdate) {
      modalupdate.classList.toggle('hidden');
    }
  }
  closeModalUpdate() {
    // Get the modal element
    const modalupdate = document.getElementById('updateProductModal');
  
    // Check if modal exists before performing operations
    modalupdate?.classList.add('hidden');
    modalupdate?.setAttribute('aria-hidden', 'true');
  }
}
