import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = ''; 

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  onSubmit() {
    this.searchChanged.emit(this.searchTerm);
  }
  
}

