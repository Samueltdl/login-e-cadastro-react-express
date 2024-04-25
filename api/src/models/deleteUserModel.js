const connectDatabase = require('../database/db'); // importando conexão com o banco de dados

// inativa o usuário especificado
const deleteUser = async (user) => {
    console.log('Starting deleteUser model.');
    const { id } = user;

    try {
      const pool = await connectDatabase();
      
      const query = `
        UPDATE users
        SET isactive = $1
        WHERE id = $2
        RETURNING *
      `;

      const values = [false, id];

      const { rows } = await pool.query(query, values);
      return rows[0];
  
    } catch (error) {
      throw new Error(`Error deactivating user: ${error.message}`);
    }
}

module.exports = deleteUser;