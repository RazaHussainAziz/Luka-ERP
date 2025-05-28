import pool from "../config/db.js";

const createUser = async (username, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Queries the database to find a user by their email address.
 *
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not.
 */

/*******  67f376fb-35e3-41cc-bdf4-17ca1a79b38f  *******/
const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

export const userModels = {
  createUser,
  findUserByEmail,
};
