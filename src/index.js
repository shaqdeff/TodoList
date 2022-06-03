import './style.css'

// Array to hold todo list items
let todoItems = [];

// Function to create new todo object
const addTodo = description => {
  const todo = {
    description,
    completed: false,
    index: Date.now(),
  }

  todoItems.push(todo);
  console.log(todoItems);
}

const form = document.querySelector('.todo-form');
// Add a submit event listener to form
form.addEventListener('submit', e => {
  // prevent default
  e.preventDefault();

  // select input field
  const input = document.getElementById('todoInput');

  // get value of input field and trim spaces
  const description = input.value.trim();
  if (description.length) {
    addTodo(description);
    input.value = '';
    input.focus();
  }
});