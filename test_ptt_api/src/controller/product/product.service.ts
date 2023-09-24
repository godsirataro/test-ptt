import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import {
  Observable,
  catchError,
  from,
  map,
  mergeMap,
  of,
  switchMap
} from 'rxjs';
import {
  Product,
  ProductModel,
  ProductSearchRequest
} from 'src/models/product.model';
import { ResponseResult } from 'src/models/response-result.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private ProductModel: mongoose.Model<Product>
  ) {}

  findAll(): Observable<ResponseResult<ProductModel[]>> {
    return from(this.ProductModel.find().exec()).pipe(
      map((datas) => {
        return ResponseResult.success(datas);
      }),
      catchError((error) => {
        return of(ResponseResult.failWithError(error.message, 405));
      })
    );
  }

  findByCondition(
    req: ProductSearchRequest
  ): Observable<ResponseResult<ProductModel[]>> {
    try {
      const query = {};
      if (req.name !== '') {
        query['name'] = req.name;
      }
      return from(this.ProductModel.find(query).exec()).pipe(
        map((res) => {
          return ResponseResult.success(res);
        }),
        catchError((error) => {
          return of(ResponseResult.failWithError(error.message, 405));
        })
      );
    } catch (error) {
      return of(ResponseResult.failWithError(error.message, 405));
    }
  }

  findById(id: string): Observable<ResponseResult<ProductModel>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return of(ResponseResult.failWithError('Invalid ID', 404));
      }
      return from(this.ProductModel.findById(id).exec()).pipe(
        mergeMap((data) => {
          if (!data) {
            return of(ResponseResult.failWithError('Data not found !', 404));
          }
          return of(ResponseResult.success(data));
        }),
        catchError((error) => {
          if (error instanceof NotFoundException) {
            return of(ResponseResult.failWithError(error.message, 404));
          } else {
            return of(ResponseResult.failWithError(error.message, 500));
          }
        })
      );
    } catch (error) {
      return of(ResponseResult.failWithError(error.message, 500));
    }
  }

  create(req: ProductModel): Observable<ResponseResult<ProductModel>> {
    try {
      const res = this.ProductModel.create(req);
      return from(res).pipe(
        map((data) => ResponseResult.success(data)),
        catchError((error) =>
          of(ResponseResult.failWithError(error.message, 405))
        )
      );
    } catch (error) {
      return of(ResponseResult.failWithError(error.message, 405));
    }
  }

  updateById(
    id: string,
    req: ProductModel
  ): Observable<ResponseResult<ProductModel>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return of(ResponseResult.failWithError('Invalid ID', 404));
      }
      return from(
        this.ProductModel.findByIdAndUpdate(id, req, { new: true })
      ).pipe(
        switchMap((updatedProduct) => {
          if (!updatedProduct) {
            return of(ResponseResult.failWithError('Data not found!', 404));
          }
          return of(ResponseResult.success(updatedProduct));
        }),
        catchError((error) => {
          if (error instanceof NotFoundException) {
            return of(ResponseResult.failWithError(error.message, 404));
          } else {
            return of(ResponseResult.failWithError(error.message, 500));
          }
        })
      );
    } catch (error) {
      return of(ResponseResult.failWithError(error.message, 500));
    }
  }
  deleteById(id: string): Observable<ResponseResult<ProductModel>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return of(ResponseResult.failWithError('Invalid ID', 404));
      }
      return from(this.ProductModel.findByIdAndDelete(id).exec()).pipe(
        map((result) => {
          if (!result) {
            return ResponseResult.failWithError('Data not found !', 404);
          }
          return ResponseResult.success(result);
        }),
        catchError((error) => {
          if (error instanceof NotFoundException) {
            return of(ResponseResult.failWithError(error.message, 404));
          } else {
            return of(ResponseResult.failWithError(error.message, 500));
          }
        })
      );
    } catch (error) {
      return of(ResponseResult.failWithError(error.message, 500));
    }
  }
}
