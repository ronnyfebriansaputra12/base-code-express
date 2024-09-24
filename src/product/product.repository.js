import prisma from "../db/index.js";

const findProducts = async () => {
    const products = await prisma.product.findMany({
        include: {
            kategori: true
        },
    });
    return products;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
        include: {
            kategori: true
        },
    });
    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            kategori_id: productData.kategori_id,
            description: productData.description,
            price: productData.price,
            image: productData.image
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

const editProduct = async (productData, id) =>{
    const product = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: productData.name,
            kategori_id: productData.kategori_id,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }
    });

    return product;
}

export default { findProducts, findProductById, insertProduct, deletetById, editProduct }