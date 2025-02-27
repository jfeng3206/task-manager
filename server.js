import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
// Router import
import taskRouter from './routes/taskRouter.js';


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/tasks', taskRouter);

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



const port = process.env.PORT || 888;
app.listen(888, () => {
  console.log(`server running on PORT ${port}....`);
});
