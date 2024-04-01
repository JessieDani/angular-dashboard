import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
 httpClient = inject(HttpClient);
 data: any[]  = [];
 selectedUser: any;
 showUserDetails: boolean = false;
 currentPage: number = 1;
 totalPages: number = 2;
 searchTerm: string = '';
 filteredData: any[] = [];

 ngOnInit(): void {
   this.fetchData();
 }

 fetchData() {
    this.httpClient.get(`https://reqres.in/api/users?page=${this.currentPage}`).subscribe((data: any) => {
      this.data = data.data;
      this.totalPages = data.total_pages;
      this.filteredData = this.data;
    });
  }
  fetchSingleUserData(id: number) {
    this.httpClient.get(`https://reqres.in/api/users/${id}`).subscribe((userData: any) => {
      this.selectedUser = userData;
      this.showUserDetails = true;

    });
    
  }
  goBack() {
    this.showUserDetails = false; 
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }
  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }
  search(searchTerm: string) {
    this.searchTerm = searchTerm;
    const userId = parseInt(searchTerm);
    if (!isNaN(userId)) {
      this.fetchSingleUserData(userId);
    }
  }
  filterData() {
    if (!this.searchTerm) {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((user: any) => 
         user.id.toString().includes(this.searchTerm) 
        // || 
        //  user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
