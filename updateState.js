const task = {
  name: 'Refactor Code',
  state: 'doing',
};

let status = ['todo', 'doing', 'done'];
const updateState = () => {
  let index = status.indexOf(task.state);
  return status[(index + 1) % status.length];
  // if (status.length == index + 1) {
  //   return status[0];
  // }
  // return status[index + 1];
};

console.log(updateState(task));
