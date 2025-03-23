import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
//Error Hanlde Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
// Authenticated middleware
import { authenticateUser } from './middleware/authMiddleware.js';
// Database Setup
import { initializeTable, setupDatabase } from './config/db.js';

setupDatabase()
  .then(() => initializeTable())
  .catch(error => console.error('Database initialization failed:', error));
// Router import
import taskRouter from './routes/taskRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use(errorHandlerMiddleware);

app.use('/api/v1/tasks', authenticateUser,taskRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser,userRouter);

// NOT FOUND MIDDLEWARE
// used when a request is made to a route that does not exist.
app.use('*', (req,res)=>{
  res.status(404).json({ msg: 'Page not found' });
})

// ERROR MIDDLEWARE
// a catch-all for handling unexpected errors that occur during request processing.
app.use((err, req, res) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong!' });
})


const port = process.env.PORT || 5101;
app.listen(5101, () => {
  console.log(`server running on PORT ${port}....`);
});
