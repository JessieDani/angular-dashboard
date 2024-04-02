import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, SpinnerComponent],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
 private httpClient = inject(HttpClient);
 data: any[]  = [];
 selectedUser: any;
 showUserDetails: boolean = false;
 currentPage: number = 0;
 totalPages: number = 2;
 filteredData: any[] = [];
 searchTerm: string = '';
 isLoading = true;
 itemsPerPage: number = 6;


 ngOnInit(): void {
   this.fetchAllData();
 }
 

 fetchAllData() {
  this.fetchData().subscribe(() => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchAllData();
      this.currentPage = 1;
    }
  });
}


fetchData(): Observable<any> {
  return this.httpClient.get(`https://reqres.in/api/users?page=${this.currentPage}`).pipe(
    tap((data: any) => {
      this.data = [...this.data, ...data.data];
      this.totalPages = data.total_pages;
      this.filteredData = Array.from(this.data).splice((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage);
    })
  );
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

  nextPage(): void {
    this.currentPage++;
    this.updateFilteredData();
  }
  
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.updateFilteredData();
  }
  
  updateFilteredData(): void {
    this.filteredData = Array.from(this.data).splice(this.currentPage * this.itemsPerPage, this.itemsPerPage);
  }
  filterData() {
    if (!this.searchTerm) {
      this.filteredData = Array.from(this.data).splice(this.currentPage * this.itemsPerPage, this.itemsPerPage);
    } else {
      this.filteredData = this.data.filter((user: any) => 
      user.id.toString().match(new RegExp(this.searchTerm, "i"))
      );

    }
  }
  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterData();
  }
  
  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }


}
