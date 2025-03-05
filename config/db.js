import pg from "pg";
const {Client, Pool} = pg;
import * as dotenv from 'dotenv';
dotenv.config();
const DB_NAME = process.env.DB_NAME || 'task_manager';
const DB_USER= process.env.DB_USER || 'me';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD= process.env.DB_PASSWORD || 'password';
const DB_PORT = process.env.DB_PORT || 5432;
const isDev = process.env.NODE_ENV === 'development';

if (!isDev)  console.log('in production environment - skipping database creation.');

const client = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
    port: DB_PORT,
});

export const setupDatabase = async() =>{
  try {
    await client.connect();
    console.log('Connected to postgres database');
    
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
    
    if (res.rowCount === 0) {
        console.log(`${DB_NAME} database not found, creating it.`);
        await client.query(`CREATE DATABASE "${DB_NAME}";`);
        console.log(`created database ${DB_NAME}.`);
    } else {
        console.log(`${DB_NAME} database already exists.`);
    }
  } catch (error) {
      console.error('Error setting up database:', error);
  } finally {
      await client.end();
  }
}

export const initializeTable = async()=>{
  const appClient = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });
  
  try {
    await appClient.connect();
    console.log(`Connected to ${DB_NAME} database`);
    
    // Create users table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role TEXT,
        register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await appClient.query(createUsersTableQuery);
    console.log('Users table created or already exists');

    const createTaskTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_complete BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INTEGER,
        
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await appClient.query(createTaskTableQuery);
    console.log('Tasks table created or already exists');
    
    // Create indexes for better performance
    const createIndexesQuery = `
      CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
    `;
    
    await appClient.query(createIndexesQuery);
    console.log('Indexes created or already exist');
    
    return true;
  } catch (error) {
    console.error('Error initializing users table:', error);
    throw error;
  } finally {
    await appClient.end();
  }
}

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});


// Export the pool for use in other files
export default pool;