import express from 'express';

const router = express.Router();
import userService from './user.services.js';


router.get("/", async (req, res) => {
    try {
        const user = await userService.getAllUser();
        res.json({
            success: true,
            message: "user fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.get("/:id"), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getDetailUser(id);
        res.json({
            success: true,
            message: "user fetched successfully",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

router.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);

        const responseData = {
            name: user.name,
            email: user.email,
            password: user.password,
        };

        res.json({
            success: true,
            message: "user created successfully",
            data: responseData
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
        const userData = req.body;
        const category = await userService.updateUser(id, userData);
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
        const userData = req.body;
        const category = await userService.updateUser(id, userData);
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
        await userService.deleteUser(id);
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
