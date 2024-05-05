import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isCollapsed = false;
  isVisible = false;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  logout() {
    // Implement logout functionality here
    console.log('Logging out...');
  }
}
