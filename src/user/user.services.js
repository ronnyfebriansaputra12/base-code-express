import userRepository from './user.repository.js';
import bcrypt from 'bcrypt';

const { getAll, findDetail, store, update, destroy, findByEmail } = userRepository;

const getAllUser = async () => {
    const user = await getAll();
    return user;
}

const getDetailUser = async (id) => {
    const user = await findDetail(id);
    if (!user) {
        throw new Error('user not found');
    }
    return user;
}

const createUser = async (newDataUser) => {
    const email = newDataUser.email;
    const userEmail = await findByEmail(email);
    
    if (userEmail) {
        throw new Error('email already exists');
    }
    
    // Hash the password and wait for the result
    newDataUser.password = await bcrypt.hash(newDataUser.password, 10);
    
    const user = await store(newDataUser);
    return user;
};


const updateUser = async (id, newDaataUser) => {
    await findDetail(id);
    if (newDaataUser.password) {
        newDaataUser.password = bcrypt.hashSync(newDaataUser.password);
    }
    const user = await update(id, newDaataUser);
    return user;
}

const deleteUser = async (id) => {
    await findDetail(id);
    const user = await destroy(id);
    return user;
}

export default {
    getAllUser,
    getDetailUser,
    createUser,
    updateUser,
    deleteUser
}