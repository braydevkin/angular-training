import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/config/constants';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackBar: MatSnackBar, private api: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    })
  }

  showErrorMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    })
  }

  storeProduct(product: Product): Observable<Product> {
    return this.api.post<Product>(`${API_URL}/products`, product).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Erro no cadastro do produto')
    return EMPTY
  }

  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(`${API_URL}/products`)
  }

  getOne(id: string): Observable<Product> {
    return this.api.get<Product>(`${API_URL}/products/${id}`)
  }

  updateProduct(product: Product): Observable<Product> {
    return this.api.put<Product>(`${API_URL}/products/${product.id}`, product)
  }

  deleteProduct(id: string): Observable<Product> {
    return this.api.delete<Product>(`${API_URL}/products/${id}`)
  }
}
