
import pool from '../config/db.js'
import { StatusCodes } from 'http-status-codes';

export const getAllTasks = async (req, res) => {
  const response = await pool.query('SELECT * FROM tasks');
  res.status(StatusCodes.OK).json(response.rows);
};

export const createTask = async  (req, res) => {
  req.body.user_id = req.user.userId;
  const { title, description, isComplete, user_id } = req.body;
  const result = await pool.query(
    `INSERT INTO tasks 
     (title, description,is_complete, user_id) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [title, description, isComplete || false, user_id]
  );
  console.log(result);
  res.status(StatusCodes.CREATED).json({
      message: 'Task Added Successfully',
      body:{
          task:{ title, description, isComplete, user_id }
      }
  });
  }

export const getTask = async (req, res) => {
  const { id } = req.params;
  const response = await pool.query('SELECT * FROM tasks WHERE id = $1',[id]);
    res.status(StatusCodes.OK).json(response.rows);
};

export const updateTask = async (req,res)=>{
  const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const updateFields = [];
    const values = [];
    let paramCounter = 1;
    if (title !== undefined) {
      updateFields.push(`title = $${paramCounter}`);
      values.push(title);
      paramCounter++;
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramCounter}`);
      values.push(description);
      paramCounter++;
    }
    
    if (isComplete !== undefined) {
      updateFields.push(`is_complete = $${paramCounter}`);
      values.push(isComplete);
      paramCounter++;
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    if (updateFields.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No fields to update' });
    }
    values.push(id);
    const query = `
      UPDATE tasks 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCounter}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No task found with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ 
      message: 'Task updated successfully', 
      task: result.rows[0] 
    });
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM tasks WHERE id = $1',[id]);
  console.log(response);
  res.status(StatusCodes.OK).json(`Task ${id} deleted successfully`);
};