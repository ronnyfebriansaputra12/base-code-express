import prisma from '../db/index.js';

const getAll = async () => {
    const user = await prisma.user.findMany({
        orderBy: {
            id: 'asc',
        },
    });
    return user;
}
const findByEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        },
    });
    return user;
}

const findDetail = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            products: true
        },
    });
    return user;
};

const store = async (dataUser) => {
    const user = await prisma.user.create({
        data: {
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password,
        },
    });
    return user;
}

const update = async (id, dataUser) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password,
        },
    });
    return user;
}

const destroy = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id
        },
    });
    return user;
}

export default {
    getAll,
    findDetail,
    store,
    update,
    destroy,
    findByEmail,
}