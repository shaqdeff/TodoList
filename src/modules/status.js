/* eslint-disable import/prefer-default-export */
export const toggleDone = (key, todoItems) => {
  // find item in the todo items array
  const index = todoItems.findIndex((item) => item.index === Number(key));
  // create new object with a completed property
  const todo = {
    ...todoItems[index],
    completed: !todoItems[index].completed,
  };
  // update the todo item in the array
  todoItems[index] = todo;
  // save to local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};