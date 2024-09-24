import kategoriRepository from './kategori.repository.js';

const { getAll, findDetail, store, update, destroy } = kategoriRepository;

const getAllCategory = async () => {
    const kategori = await getAll();
    return kategori;
}

const getDetailCategory = async (id) => {
    const kategori = await findDetail(id);
    if (!kategori) {
        throw new Error('Kategori not found');
    }
    return kategori;
}

const createCategory = async (dataCategory) => {
    const kategori = await store(dataCategory);
    return kategori;
}

const updateCategory = async (id, dataCategory) => {
    await findDetail(id);
    const kategori = await update(id, dataCategory);
    return kategori;
}

const deleteCategory = async (id) => {
    await findDetail(id);
    const kategori = await destroy(id);
    return kategori;
}

export default {
    getAllCategory,
    getDetailCategory,
    createCategory,
    updateCategory,
    deleteCategory
}