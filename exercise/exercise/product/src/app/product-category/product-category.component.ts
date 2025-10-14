import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductCategory } from '../model/product-category';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  providers: [ProductService],
})
export class ProductCategoryComponent implements OnInit {
  public productsCategory: ProductCategory[] = [];

  constructor(private productService: ProductService) {
    /*
    // Sample mock data (kept for reference only)
    this.productsCategory = [
      {
        "categoryName": "Snacks",
        "products": [
          {
            "id": 1,
            "name": "Alaska",
            "description": "This is a description of Alaska",
            "categoryName": "Snack",
            "unitOfMeasure": "can",
            "imageFile": "Alaska",
            "price": "30.00"
          },
          {
            "id": 2,
            "name": "Cardbury",
            "description": "This is a description of Cardbury",
            "categoryName": "Snacks",
            "unitOfMeasure": "ounce",
            "imageFile": "cardbury",
            "price": "10.00"
          },
          {
            "id": 3,
            "name": "Milo",
            "description": "This is a description of Milo",
            "unitOfMeasure": "can",
            "categoryName": "Snacks",
            "imageFile": "milo",
            "price": "120.00"
          }
        ]
      },
      {
        "categoryName": "Audio",
        "products": [
          {
            "id": 4,
            "name": "denonreceiver",
            "description": "This is a description of Denon receiver",
            "unitOfMeasure": "piece",
            "imageFile": "denonreceiver",
            "categoryName": "Audio",
            "price": "1420.00"
          },
          {
            "id": 5,
            "name": "Mango",
            "description": "This is a description of Mango",
            "unitOfMeasure": "piece",
            "imageFile": "mango",
            "categoryName": "Audio",
            "price": "0.00"
          },
          {
            "id": 6,
            "name": "soundbar",
            "description": "This is a description of the Sound bar",
            "unitOfMeasure": "piece",
            "imageFile": "soundbar",
            "categoryName": "Audio",
            "price": "30.00"
          },
          {
            "id": 7,
            "name": "soundbar2",
            "description": "This is a description of another soundbar",
            "categoryName": "Audio",
            "imageFile": "soundbar2",
            "unitOfMeasure": "piece",
            "price": "350.00"
          }
        ]
      },
      {
        "categoryName": "Dessert",
        "products": [
          {
            "id": 8,
            "name": "banana",
            "description": "This is a description of banana",
            "categoryName": "Dessert",
            "imageFile": "banana",
            "unitOfMeasure": "kilo",
            "price": "20.00"
          },
          {
            "id": 9,
            "name": "Banana Split",
            "description": "This is a description of banana split ice cream",
            "categoryName": "Dessert",
            "imageFile": "bananasplit",
            "unitOfMeasure": "serving",
            "price": "220.00"
          },
          {
            "id": 10,
            "name": "Leo Milka",
            "description": "This is a description of Leo Milka",
            "categoryName": "Dessert",
            "imageFile": "leomilka",
            "unitOfMeasure": "grams",
            "price": "620.00"
          },
          {
            "id": 11,
            "name": "Strawberry",
            "description": "This is a description of Strawberry",
            "categoryName": "Dessert",
            "imageFile": "strawberry",
            "unitOfMeasure": "grams",
            "price": "10.00"
          }
        ]
      }
    ];
    */
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.productService.getData().subscribe((data) => {
      this.productsCategory = data;
    });
  }
}
