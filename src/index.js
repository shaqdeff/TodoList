import './style.css';

// Array to hold todo list items
const todoItems = [];
let index = 0;

const renderTodo = (todo) => {
  // select ul element
  const list = document.querySelector('.todo-list');

  // check if todo is completed
  const isCompleted = todo.completed ? 'done' : '';

  // create li element
  const li = document.createElement('li');
  li.setAttribute('class', `todo-item ${isCompleted}`);
  li.setAttribute('data-key', todo.index);

  li.innerHTML = `
    <input id="${todo.index}" type="checkbox"/>
    <label for="${todo.index}" class="tick js-tick"></label>
    <span>${todo.description}</span>
    <i class="fa fa-trash-alt delete"></i>
  `;

  list.append(li);
};

// Function to create new todo object
const addTodo = (description) => {
  const todo = {
    description,
    completed: false,
    index,
  };

  index += 1;
  todoItems.push(todo);
  renderTodo(todo);
  console.log(todoItems);
};

// select form
const form = document.querySelector('.todo-form');
// Add a submit event listener to form
form.addEventListener('submit', (e) => {
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

//  select plus icon
const plusIcon = document.querySelector('.add');
// Add an event click listener to the plus icon
plusIcon.addEventListener('click', () => {
  const input = document.getElementById('todoInput');
  const description = input.value.trim();
  if (description.length) {
    addTodo(description);
    input.value = '';
    input.focus();
  }
});

// delete todo items
// select entire list
const list = document.querySelector('.todo-list');

// add click event listener to trash icon
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove()
  }
})
