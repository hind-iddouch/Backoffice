export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
