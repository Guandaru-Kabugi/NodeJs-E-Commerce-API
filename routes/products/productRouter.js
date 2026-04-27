import express from "express";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../../controllers/products/productController.js";
import authenticateUser from "../../middlewares/auth.js";

const productRouter = express.Router();

/**
 * @swagger
 * /api/v1/products/createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - product_serial
 *               - tag
 *               - image_url
 *             properties:
 *               title:
 *                 type: string
 *                 example: Samsung A16
 *               description:
 *                 type: string
 *                 example: A16 2023 Model
 *               product_serial:
 *                 type: string
 *                 example: 10928USBDJ0KL
 *               tag:
 *                  type: string
 *                  example: mobile_phones
 *               image_url:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid Entry
 *       409:
 *         description: product serial already in use
 */
productRouter.post('/createProduct', authenticateUser, createProduct);

/**
 * @swagger
 * /api/v1/products/getAllProducts:
 *   post:
 *     summary: get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Fetched all products successfully
 */
productRouter.get('/getAllProducts', authenticateUser, getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   post:
 *     summary: get one product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Fetched one product successfully
 */
productRouter.get('/:id',authenticateUser, getProductById);


/**
 * @swagger
 * /api/v1/products/updateProduct:
 *   post:
 *     summary: update a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Samsung A16
 *               description:
 *                 type: string
 *                 example: A16 2023 Model
 *               product_serial:
 *                 type: string
 *                 example: 10928USBDJ0KL
 *               tag:
 *                  type: string
 *                  example: mobile_phones
 *               image_url:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid Entry
 *       404:
 *         description: product with this id not found
 */
productRouter.patch('/updateProduct/:id',authenticateUser, updateProduct);


/**
 * @swagger
 * /api/v1/products/{id}:
 *   post:
 *     summary: delete one product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: One product deleted successfully
 *       404:
 *          description: Product with this id not found
 */
productRouter.delete('/:id',authenticateUser, deleteProduct);

export default productRouter;