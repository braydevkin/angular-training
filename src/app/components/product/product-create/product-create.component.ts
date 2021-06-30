import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from "@angular/router"
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  atributeTest = 'Qualquer'

  product: Product = {
    name: 'Produto de teste',
    price: 200
  }

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.storeProduct(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso')
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }



}
