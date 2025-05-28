import pool from '../config/db.js';

const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username,email',
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

const findUserByEmail = async (email, userType) => {
    const result = await pool.query(
        `SELECT id,username,email,password FROM ${userType} WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};

export { createUser, findUserByEmail };
