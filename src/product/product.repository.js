import prisma from "../db/index.js";

const findProducts = async (offset, limit) => {
    const products = await prisma.product.findMany({
        skip: offset,
        take: parseInt(limit)
    });
    return products;
};

const countTotalProducts = async () => {
    const total = await prisma.product.count();
    return total;
};

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });
    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price
        }
    });
    return product;
}

const deletetById = async (id) => {
    const product = await prisma.product.delete({
        where: {
            id,
        },
    });
    return product;
}

const editProduct = async (productData, id) => {
    const product = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
        }
    });

    return product;
}

const findProductByName = async (name) => {
    return await prisma.product.findFirst({
        where: {
            name: name,
        },
    });
};


export default { findProducts, findProductById, insertProduct, deletetById, editProduct, findProductByName, countTotalProducts }