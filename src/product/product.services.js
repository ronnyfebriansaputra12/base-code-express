import productRepository from '../product/product.repository.js';
import path from 'path';
const { findProducts, findProductById, insertProduct, deletetById, editProduct, findProductByName, countTotalProducts } = productRepository;

const getAllProducts = async (page, limit) => {
    const offset = (page - 1) * limit;
    const products = await findProducts(offset, limit);
    const totalItems = await countTotalProducts();
    const totalPages = Math.ceil(totalItems / limit);

    return {
        data: products,
        totalItems,
        totalPages
    };
};


const getProductById = async (id) => {
    const product = await findProductById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

const createProduct = async (productData) => {
    console.log(productData.name);

    const existingProduct = await findProductByName(productData.name);

    if (existingProduct) {
        throw new Error('Product name already exists');
    }
    const product = await insertProduct(productData);
    return product;
}

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
