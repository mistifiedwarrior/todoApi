const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
let data = require('./todoData.json');

const storeData = () => {
  fs.writeFileSync('./todoData.json', JSON.stringify(data));
};
//add task
let {id} = data.allTask[data.allTask.length - 1] || {id: 0};
app.post('/addTask', (req, res) => {
  const todo = req.body;
  // todo.isComplete = false;
  todo.state = 'Todo';
  todo.id = ++id;
  data.allTask.push(todo);
  storeData();
  res.end();
});

// Update task
let status = ['Todo', 'doing', 'done'];

const updateState = (todo) => {
  let index = status.indexOf(todo.state);
  todo.state = status[(index + 1) % status.length];
};

app.get('/updateState/:id', (req, res) => {
  const todo = data.allTask.find((todo) => todo.id === +req.params.id);
  if (!todo) return res.status(400).json({msg: 'No task with this id'});
  updateState(todo);
  // todo.isComplete = !todo.isComplete;
  storeData();
  res.json({msg: 'Task State Updated'});
});

// delete task
app.get('/deleteTask/:id', (req, res) => {
  data.allTask = data.allTask.filter((task) => task.id !== +req.params.id);
  storeData();
  res.json({msg: 'Task Deleted'});
});

// remove all task
app.get('/removeAll', (req, res) => {
  data.allTask = [];
  storeData();
  res.json({msg: ' tasks removed'});
});

//get task
app.get('/getTask/:id', (req, res) => {
  const task = data.allTask.find((task) => task.id === +req.params.id);
  res.json(task);
});

//Fetch whole task
app.get('/wholeTask', (req, res) => {
  res.json(data);
});

//edit Title
app.post('/editTitle', (req, res) => {
  data.title = req.body.title;
  storeData();
  res.json({msg: 'Title Edited '});
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
