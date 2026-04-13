import ProductModel from "../../models/products/product.js";
import AppError from "../../utils/appError.js";

class ProductService {
  static async createProduct(data) {
    return await ProductModel.createProduct(data);
  }

  static async getProducts() {
    return await ProductModel.getAllProducts();
  }
  static async getProductById(id) {
    // First confirm the product exists
    const product = await ProductModel.getProductById(id);
    if (!product) throw new AppError("Product not found", 404);

    return product;
  }
  static async updateProduct(id, data) {
    const product = await ProductModel.updateProduct(id, data);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  static async deleteProduct(id) {
    const product = await ProductModel.deleteProduct(id);
    if (!product) throw new AppError("Product not found", 404);
    return { message: "Product deleted successfully" };
  }
}

export default ProductService;
