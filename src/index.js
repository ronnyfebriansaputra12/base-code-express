import express from 'express';
import dotenv from 'dotenv';
import productController from "../src/product/product.controller.js";
import categoriesController from "./kategori/kategori.controller.js";
import userController from "./user/user.controller.js";
import AuthController from "./auth/auth.controller.js";
import verifyToken from './middleware/VerifyToken.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 


app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productController);
// app.use("/api/categories", categoriesController);
// app.use("/api/users", userController);
// app.use("/api", AuthController);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
