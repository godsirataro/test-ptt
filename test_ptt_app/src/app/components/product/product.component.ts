import { ProductService } from 'src/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/services/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: ProductModel = new ProductModel;
  productImage: string = '';
  productName: string = '';
  productDescription: string = '';

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
  }

  saveData() {
          // Create new developer data
          this.productService.create(this.data).subscribe({
            next: (result) => {
              if (result.isSuccess) {
                alert("Create Success !")
                window.location.reload();
              } else {
                console.log(`${result.data}`);
              }
            },
            error: (error) => {
              console.log(`An error created: '${error}`);
            },
          });
        }
}
