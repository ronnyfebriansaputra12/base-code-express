// LAYER UNTUK HANDLE REQUEST DAN RESPONSES
// VALIDASI JUGA

import express from 'express';
const router = express.Router();
import productService from './product.services.js';
import { upload } from '../utils/fileUploads.js'; // Import the multer configuration

const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } = productService;


router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.json({
        success: true,
        message: "Products fetched successfully",
        data: products
    })
})

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

router.post("/", upload.single('image'), async (req, res) => {
    try {
        const productData = {
            ...req.body,
            kategori_id: parseInt(req.body.kategori_id, 10),
            price: parseInt(req.body.price, 10),
        };
        const newProduct = await createProduct(productData, req.file);

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
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
        if (!(productData.image && productData.description && productData.price && productData.name)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
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