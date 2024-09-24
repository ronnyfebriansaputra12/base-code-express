import express from 'express';

const router = express.Router();
import authService from './auth.services.js';


router.post("/auth", async (req, res) => {
    try {
        const userData = req.body;
        const user = await authService.userLogin(userData);
        res.json({
            success: true,
            message: "User logged in successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/registration", async (req, res) => {
    try {
        const userData = req.body;
        const user = await authService.userRegistration(userData);
        res.json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.get("/profile", async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = await authService.profile(token);
        res.json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
