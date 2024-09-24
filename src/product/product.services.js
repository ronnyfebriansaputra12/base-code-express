import productRepository from '../product/product.repository.js';
import path from 'path';
const { findProducts, findProductById, insertProduct, deletetById, editProduct } = productRepository;

const getAllProducts = async () => {
    const products = await findProducts();
    return products;
};
const getProductById = async (id) => {
    const product = await findProductById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

const createProduct = async (productData, file) => {
    if (file && file.filename) {
        productData.image = file.filename;
    } else {
        productData.image = 'products.png';
    }

    const product = await insertProduct(productData);
    return product;
};


const deleteProductById = async (id) => {
    await getProductById(id);
    const product = await deletetById(id);
    return product;
}

const updateProductById = async (productData, id) => {
    await getProductById(id);
    const product = await editProduct(productData, id)
    return product;
}

export default { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById };
