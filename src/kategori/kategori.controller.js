import express from 'express';

const router = express.Router();
import categoryService from './kategori.services.js';


router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategory();
        res.json({
            success: true,
            message: "Categories fetched successfully",
            data: categories
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
        const categoryData = req.body;
        const category = await categoryService.createCategory(categoryData);
        res.json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categoryData = req.body;
        const category = await categoryService.updateCategory(id, categoryData);
        res.json({
            success: true,
            message: "Category updated successfully",
            data: category
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
        const categoryData = req.body;
        const category = await categoryService.updateCategory(id, categoryData);
        res.json({
            success: true,
            message: "Category updated successfully",
            data: category
        });
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await categoryService.deleteCategory(id);
        res.json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});
export default router;
