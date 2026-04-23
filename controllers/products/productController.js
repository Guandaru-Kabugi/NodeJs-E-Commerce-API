import ProductService from "../../services/products/productService.js";


export async function createProduct(req, res, next){
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);        
    } catch (error) {
        next(error);
    }

}
export async function getProducts(req, res, next) {

    try {
        const products = await ProductService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
    
}
export async function getProductById(req, res, next) {

    try {
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
    
}
export async function updateProduct(req, res, next) {

    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
    
}
export async function deleteProduct(req, res, next) {

    try {
        const message = await ProductService.deleteProduct(req.params.id);
        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
    
}