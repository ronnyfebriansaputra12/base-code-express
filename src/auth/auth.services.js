import AuthRepository from './auth.repository.js';
import bcrypt from 'bcrypt';
import Token from '../helper/jwt.js';
const { authentication, registration, updateRefreshToken, getProfile, verifyToken } = AuthRepository;
const { generateAccessToken, generateRefreshToken, verifyAccessToken } = Token;


const userRegistration = async (dataCategory) => {
    const user = await registration(dataCategory);
    const passMatch = dataCategory.password != dataCategory.password_confirmation;
    if (passMatch) {
        throw new Error('password not match');
    }
    dataCategory.password = await bcrypt.hash(dataCategory.password, 10);
    return user;
}

const userLogin = async (dataCategory) => {
    const user = await authentication(dataCategory);
    const login = await bcrypt.compare(dataCategory.password, user.password);

    if (!login) {
        throw new Error('wrong password');
    }

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    const token = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await updateRefreshToken(user.id, refreshToken);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
        refreshToken
    };
}

const profile = async (token) => {
    const decoded = await verifyAccessToken(token);
    if (!decoded) {
        throw new Error('invalid token');
    }
    const id = decoded.id;
    const user = await getProfile(id);
    if (!user) {
        throw new Error('user not found');
    }
    return user
}

export default {
    userLogin,
    userRegistration,
    profile
}