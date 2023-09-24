import { Component } from '@angular/core';
import { ProductModel } from 'src/services/models/product.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  cards: ProductModel[] = [];
  // cards = [
  //   {
  //     imageUrl: 'data:image/jpeg;base64,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',
  //     name: 'Card 1',
  //     description: 'Description for Card 1'
  //   },
  //   {
  //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Fumio_Kishida_and_Prayut_Chan-o-cha_at_the_Prime_Minister%27s_Office_2022_%281%29_%28cropped%29.jpg',
  //     name: 'Card 2',
  //     description: 'Description for Card 2'
  //   },
  //   {
  //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Prayut_2022.jpg/640px-Prayut_2022.jpg',
  //     name: 'Card 3',
  //     description: 'Description for Card 3'
  //   },
  //   {
  //     imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict0003242027621.jpg?strip=all&w=552',
  //     name: 'Card 4',
  //     description: 'Description for Card 4'
  //   },
  // ];
  filteredCards = [...this.cards]; // Initialize filteredCards with all cards
  searchText = ''; // Initialize searchText as an empty string

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(){
    this.getAllData();
  }

  getAllData() {
    this.productService.getAll().subscribe({
      next: (result) => {
        if (result.isSuccess) {
          if (typeof result.data === 'string') {
            // handle string error message
          } else {
                    // handle AuthorizationModel data
            this.cards = result.data ?? [];
            this.filteredCards = this.cards;
                  }
                } else {
        }
      },
    });
  }

  filterCards() {
    // Trim and convert the searchText to lowercase for case-insensitive matching
    const searchTerm = this.searchText.trim().toLowerCase();

    if (!searchTerm) {
      // If the search input is empty, show all cards
      this.filteredCards = [...this.cards];
    } else {
      // Otherwise, filter cards by name
      this.filteredCards = this.cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm)
      );
    }
  }
}
