import Verify from '../helper/jwt.js';
const { verifyAccessToken, verifyRefreshToken } = Verify;

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }

    try {
        const decoded = await verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            try {
                const decoded = await verifyRefreshToken(token);
                const newAccessToken = await decoded.generateAccessToken();
                res.json({
                    success: true,
                    message: 'Token expired, new access token generated',
                    data: newAccessToken
                });
            } catch (error) {
                res.status(403).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
        }
    }
}

export default verifyToken;