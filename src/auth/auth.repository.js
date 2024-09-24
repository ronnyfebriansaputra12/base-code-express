import prisma from '../db/index.js';


const registration = async (dataLogin) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: dataLogin.name,
                email: dataLogin.email,
                password: dataLogin.password
            }
        });
        return user;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Email already exists');
        } else {
            throw new Error('Failed to register user');
        }
    }
}


const authentication = async (dataLogin) => {
    const user = await prisma.user.findFirst({
        where: {
            email: dataLogin.email
        }
    });
    return user
}

const updateRefreshToken = async (id, refreshToken) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            refreshToken
        }
    })
    return user
}


const getProfile = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}

const verifyToken = async (token) => {
    try {
        const decoded = await prisma.user.findUnique({
            where: {
                token: token
            }
        })
        return decoded
    } catch (error) {
        return null
    }
}


export default {
    authentication,
    registration,
    updateRefreshToken,
    getProfile,
    verifyToken
}