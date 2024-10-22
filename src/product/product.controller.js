// LAYER UNTUK HANDLE REQUEST DAN RESPONSES
// VALIDASI JUGA

import express from 'express';
const router = express.Router();
import productService from './product.services.js';
import { upload } from '../utils/fileUploads.js'; // Import the multer configuration

const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } = productService;


router.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const products = await getAllProducts(page, limit);
    res.json({
        success: true,
        message: "Products fetched successfully",
        data: products.data,
        meta: {
            totalItems: products.totalItems,
            totalPages: products.totalPages,
            currentPage: page
        }
    });
});


router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const products = await getProductById(id);
        res.json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const productData = req.body;        
        if (!(productData.description && productData.price && productData.name)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const newProduct = await productService.createProduct(productData);
        res.json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProductById(parseInt(id));
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

})


router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productData = req.body;
        if (!(productData.description && productData.price && productData.name)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const product = await productService.updateProductById(productData, id);
        res.json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productData = req.body;
        const product = await updateProductById(productData, id);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

export default router;