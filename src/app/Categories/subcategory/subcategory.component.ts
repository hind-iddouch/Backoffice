import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit{
  showForm: boolean = false;
  subcategories: any = [];

  constructor(private subcategoryService: SubcategoryService) { }

  ngOnInit() {
    this.getAllSubcategories();
  }

  getAllSubcategories() {
    this.subcategoryService.getAllSubcategories().subscribe((res) => {
      console.log(res);
      this.subcategories = res;
    });
  }

  deleteSubcategory(id: number) {
    this.subcategoryService.deleteSubcategory(id).subscribe((res) => {
      console.log(res);
      this.getAllSubcategories();
    });
  }
  
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  editSubcategory(id: number): void {
    // Here you can implement the logic to handle editing the subcategory with the given id
    console.log('Editing subcategory with id:', id);
  }
}
