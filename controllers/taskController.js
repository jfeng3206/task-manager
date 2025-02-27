import { nanoid } from 'nanoid';
//Create local Tasks
let tasks = [
  { id: nanoid(), title: 'apple', description: 'front-end' , isComplete: false},
  { id: nanoid(), title: 'google', description: 'back-end', isComplete: false},
];

export const getAllTasks = async (req, res) => {
  res.status(200).json({ tasks });
};

export const createTask = async  (req, res) => {
  const {title, description, isComplete} = req.body;
  if(!title ||!description ){
    return res.status(400).json({error: 'Please provide title and description'});
  }
  const id = nanoid(10);
  const task = {id, title, description,  isComplete: isComplete ?? false, };
  tasks.push(task);
  res.status(200).json({ tasks });
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ msg: `no Task with id ${id}` });
  }
  res.status(200).json({ task });
};

export const updateTask = async (req,res)=>{
  const {title, description, isComplete} = req.body;
  if(!title ||!description){
    return res.status(400).json({error: 'Please provide title and description'});
  }
  const { id } = req.params;
  const task = tasks.find((task)=>task.id===id);
  if (!task) {
    return res.status(404).json({ msg: `no Task with id ${id}` });
  }
  task.title = title;
  task.description = description;
  if(isComplete) task.isComplete = isComplete;
  res.status(200).json({ mesg:'Task modified', task });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ msg: `no task with id ${id}` });
  }
  tasks.splice(index, 1);
  res.status(200).json({ msg:'Task deleted', tasks });
};