const toggleDone = (key) => {
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
  renderTodo(todoItems[index]);
};

// Add a click event listener to the list and its children
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-tick')) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});