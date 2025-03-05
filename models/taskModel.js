// // models/Task.js
// const pool = require('../db');

// class Task {
//   static async getAll() {
//     const result = await pool.query('SELECT * FROM mern_app.tasks ORDER BY id ASC');
//     return result.rows;
//   }
  
//   static async getByUserId(userId) {
//     const result = await pool.query('SELECT * FROM mern_app.tasks WHERE user_id = $1', [userId]);
//     return result.rows;
//   }
  
//   static async create(title, description, status, dueDate, userId) {
//     const result = await pool.query(
//       'INSERT INTO mern_app.tasks (title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [title, description, status, dueDate, userId]
//     );
//     return result.rows[0];
//   }
  
//   // Add update and delete methods as needed
// }

// module.exports = Task;
