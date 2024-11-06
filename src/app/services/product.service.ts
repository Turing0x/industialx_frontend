import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';

import { Product } from '../interface/product.interface';
import { Environments } from '../environment/env';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private url: string = `${Environments.baseUrl}/products`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<any>(this.url, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          return throwError(() => e);
        })
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<any>(`${this.url}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          return throwError(() => e);
        })
      );
  }

  saveProduct(product: object): Observable<boolean> {
    return this.http
      .post<HttpResponse<any>>(this.url, product, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => response.status === 200),
        catchError((e) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          return of(false);
        })
      );
  }

  editProductById(productId: string, product: object): Observable<boolean> {
    return this.http
      .put<HttpResponse<any>>(`${this.url}/${productId}`, product, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => response.status === 200),
        catchError((e) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          return of(false);
        })
      );
  }

  deleteProductById(productId: string): Observable<boolean> {
    return this.http
      .delete<HttpResponse<any>>(`${this.url}/${productId}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => {
          return response.status === 200;
        }),
        catchError((e) => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          );
          return of(false);
        })
      );
  }
}
