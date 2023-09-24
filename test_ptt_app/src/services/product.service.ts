import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { handleErrorService } from './handleError.service';
import {
  ProductModel,
  ProductSearchRequest,
} from 'src/services/models/product.model';
import { ResponseResult } from 'src/services/models/responseResult.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private handleError: handleErrorService,
  ) {}

  api = "/api/product/";

  getAll(): Observable<ResponseResult<ProductModel[]>> {
    return this.http
      .get<ResponseResult<ProductModel[]>>(`${this.api}/getAll`)
      .pipe(catchError(this.handleError.handleError));
  }

  getById(id: string): Observable<ResponseResult<ProductModel>> {
    return this.http
      .get<ResponseResult<ProductModel>>(`${this.api}/getById/${id}`, {
      })
      .pipe(catchError(this.handleError.handleError));
  }

  getByCondition(
    data: ProductSearchRequest
  ): Observable<ResponseResult<ProductModel[]>> {
    return this.http
      .post<ResponseResult<ProductModel[]>>(
        `${this.api}/getByCondition`,
        data
      )
      .pipe(catchError(this.handleError.handleError));
  }

  create(data: ProductModel): Observable<ResponseResult<ProductModel>> {
    return this.http
      .post<ResponseResult<ProductModel>>(`${this.api}/create`, data)
      .pipe(catchError(this.handleError.handleError));
  }

  update(
    id: string,
    data: ProductModel
  ): Observable<ResponseResult<ProductModel>> {
    return this.http
      .put<ResponseResult<ProductModel>>(
        `${this.api}/update`,
        data
      )
      .pipe(catchError(this.handleError.handleError));
  }

  delete(id: string): Observable<ResponseResult<ProductModel>> {
    return this.http
      .delete<ResponseResult<ProductModel>>(`${this.api}/delete`)
      .pipe(catchError(this.handleError.handleError));
  }
}
