class ProductModel {
  _id!: string;
  imageUrl! : string;
  name!: string;
  description!: string;
}

class ProductSearchRequest {
  name?: string;
}

export { ProductModel, ProductSearchRequest };
