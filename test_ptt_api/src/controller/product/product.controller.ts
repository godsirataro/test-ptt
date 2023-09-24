/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  ProductModel,
  ProductSearchRequest
} from 'src/models/product.model';
import { ResponseResult } from 'src/models/response-result.model';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Get('/getAll')
  @ApiOperation({ summary: 'Get all data from this api.' })
  @ApiResponse({
    status: 200,
    description: 'All data list',
    type: ResponseResult<ProductModel[]>
  })
  findAll(): Observable<ResponseResult<ProductModel[]>> {
    return this.ProductService.findAll();
  }

  @Get('/getById/:id')
  @ApiOperation({ summary: 'Get a Product by ID.' })
  @ApiParam({
    name: 'id',
    example: '6144a4ee0f013fd1ef0b4d72',
    description: 'The ID of the Product.'
  })
  @ApiResponse({
    status: 200,
    description: 'The Product with the specified ID.',
    type: ResponseResult<ProductModel>
  })
  findById(
    @Param('id') id: string
  ): Observable<ResponseResult<ProductModel>> {
    return this.ProductService.findById(id);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create a new Product.' })
  @ApiBody({ type: ProductModel })
  @ApiResponse({
    status: 200,
    description: 'The created Product',
    type: ResponseResult<ProductModel>
  })
  create(
    @Body() req: ProductModel
  ): Observable<ResponseResult<ProductModel>> {
    return this.ProductService.create(req);
  }

  @Post('/getByCondition')
  @ApiOperation({ summary: 'Get Products by search criteria.' })
  @ApiBody({ type: ProductSearchRequest })
  @ApiResponse({
    status: 200,
    description: 'The Products that match the search criteria.',
    type: ResponseResult<ProductModel>
  })
  findByCondition(
    @Body() req: ProductSearchRequest
  ): Observable<ResponseResult<ProductModel[]>> {
    return this.ProductService.findByCondition(req);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update a Product by ID.' })
  @ApiParam({
    name: 'id',
    example: '6144a4ee0f013fd1ef0b4d72',
    description: 'The ID of the Product.'
  })
  @ApiBody({ type: ResponseResult<ProductModel> })
  @ApiResponse({
    status: 200,
    description: 'The updated Product.',
    type: ResponseResult<ProductModel>
  })
  updateById(
    @Param('id') id: string,
    @Body() req: ProductModel
  ): Observable<ResponseResult<ProductModel>> {
    return this.ProductService.updateById(id, req);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a Product by ID.' })
  @ApiParam({
    name: 'id',
    example: '6144a4ee0f013fd1ef0b4d72',
    description: 'The ID of the Product.'
  })
  @ApiResponse({
    status: 200,
    description: 'The deleted Product.',
    type: ResponseResult<ProductModel>
  })
  deleteById(
    @Param('id') id: string
  ): Observable<ResponseResult<ProductModel>> {
    return this.ProductService.deleteById(id);
  }
}
