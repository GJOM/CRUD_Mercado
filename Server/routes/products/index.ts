import { Router } from "express";
import { registerProduct, getAllProducts, getProduct } from "../../controllers/products";
import { productUpload } from "../../Config/multer";

export const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/register', productUpload.single('image'), registerProduct);