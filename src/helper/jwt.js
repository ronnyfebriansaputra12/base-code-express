import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1d'
    });
}

const generateRefreshToken = (user, jti) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
}

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
}

const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
}


export default { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }