import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './product/products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './order/orders/orders.component';
import { CategoryComponent } from './Categories/category/category.component';
import { SubcategoryComponent } from './Categories/subcategory/subcategory.component';
import { DashHomeComponent } from './dash-home/dash-home.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'dash-home', component: DashHomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'Customers', component: CustomersComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'subcategory', component: SubcategoryComponent },
    { path: 'Orders', component: OrdersComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
