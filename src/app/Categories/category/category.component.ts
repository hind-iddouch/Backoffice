import { Component, OnInit} from '@angular/core';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  showForm: boolean = false;
  categories: any = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }
deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.getAllCategories();
    });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  
  editCategory(id: number): void {
    // Here you can implement the logic to handle editing the category with the given id
    console.log('Editing category with id:', id);
  }

}
