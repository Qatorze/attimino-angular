import { Component } from '@angular/core';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  faSearch = faSearch;
  faClose = faClose;
  showModal = false;
  
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
