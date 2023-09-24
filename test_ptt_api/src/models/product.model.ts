/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Schema({
  timestamps: true
})
class Product {
  @Prop({ type: String, required: false })
  imageUrl: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);

class ProductModel {
  @ApiProperty({
    example: 'www.googleimage.com'
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    example: 'Apple'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'desc product.'
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

class ProductSearchRequest {
  @ApiProperty({
    example: 'apple'
  })
  @IsString()
  name: string;
}

// class ProductSearchResult {
//     // id : string;
//     name : string;
// };

export {
  Product,
  ProductSchema,
  ProductModel,
  ProductSearchRequest
  // ProductSearchResult,
  // ProductUpdateModel,
};
