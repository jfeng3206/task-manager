
import pool from '../config/db.js'
import { StatusCodes } from 'http-status-codes';

export const getUsers = async (req,res)=>{
    const response = await pool.query('SELECT * FROM users');
    res.status(StatusCodes.OK).json(response.rows);
};

// export const getUserById = async(req,res) => {
//     const id = req.params.id;
//     const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
//     res.status(StatusCodes.OK).json(response.rows);
// };



// export const deleteUser = async(req,res) =>{
//     const id = req.params.id;
//     const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
//     console.log(response);
//     res.status(StatusCodes.OK).json(`User ${id} deleted successfully`);
// };

// export const updateUser = async(req,res) => {
//     const {name, email} = req.body;
//     const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
//     console.log(response);
//     res.status(StatusCodes.OK).json('User updated successfully');
// };

export const getCurrentUser = async (req, res) => {
    const id = req.user.userId;
    const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
    const user = response.rows[0];
    res.status(StatusCodes.OK).json({ user });
  };
  
  export const getApplicationStats = async (req, res) => {
    const userCountResult = await pool.query('SELECT COUNT(*) FROM users');
    const users = parseInt(userCountResult.rows[0].count);

    const taskCountResult = await pool.query('SELECT COUNT(*) FROM tasks');
    const tasks = parseInt(taskCountResult.rows[0].count);
    res.status(StatusCodes.OK).json({ users, tasks });
  };