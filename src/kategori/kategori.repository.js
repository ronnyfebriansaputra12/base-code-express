import prisma from '../db/index.js';

const getAll = async () => {
    const kategori = await prisma.kategori.findMany({
        include: {
            products: true
        },
        orderBy: {
            id: 'asc',
        },
    });
    return kategori;
}

const findDetail = async (id) => {
    const kategori = await prisma.kategori.findUnique({
        where: {
            id
        },
        include: {
            products: true
        },
    });
    return kategori;
};

const store = async (dataCategory) => {
    const kategori = await prisma.kategori.create({
        data: {
            name: dataCategory.name
        },
    });
    return kategori;
}

const update = async (id, dataCategory) => {
    const kategori = await prisma.kategori.update({
        where: {
            id
        },
        data: {
            name: dataCategory.name
        },
    });
    return kategori;
}

const destroy = async (id) => {
    const kategori = await prisma.kategori.delete({
        where: {
            id
        },
    });
    return kategori;
}

export default {
    getAll,
    findDetail,
    store,
    update,
    destroy
}