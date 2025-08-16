import pool from '../config/db.js';

const createUser = async (username, email, hashedPassword) => {
    try {
        const result = await pool.query(
            'INSERT INTO "user" (username, email, password,pro,created_at) VALUES ($1, $2, $3,$4, $5) RETURNING id,username,email,created_at',
            [username, email, hashedPassword, false, new Date()]
        );

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

const emailExists = async (email) => {
    const { rows } = await pool.query(
        `SELECT EXISTS (SELECT 1 FROM "user" WHERE email = $1)`,
        [email]
    );
    return rows[0].exists; // true or false
};

const findUserByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT *
       FROM "user"
      WHERE email = $1
      LIMIT 1`,
        [email]
    );
    return rows[0]; // true or false
};

const findEmployeeByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT *
       FROM employee
      WHERE email = $1
      LIMIT 1`,
        [email]
    );
    return rows[0]; // true or false
};

export { createUser, emailExists, findUserByEmail, findEmployeeByEmail };
