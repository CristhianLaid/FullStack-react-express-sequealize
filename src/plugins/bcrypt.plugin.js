import bcrypt from 'bcryptjs';

const bcryptPlugin = {
    hashPassword: async (password) => await bcrypt.hash(password, 10),
    comparePassword: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword)
}

export default bcryptPlugin;