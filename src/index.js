import './style.css';

// Array to hold todo list items
let todoItems = [];
let index = 0;

const renderTodo = (todo) => {
  // local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  // select ul element
  const list = document.querySelector('.todo-list');
  // select current item in the DOM
  const item = document.querySelector(`[data-key='${todo.index}']`);

  // remove item from DOM
  if (todo.deleted) {
    item.remove();
    return;
  }

  // check if todo is completed
  const isCompleted = todo.completed ? 'done' : '';

  // create li element
  const li = document.createElement('li');
  li.setAttribute('class', `todo-item ${isCompleted}`);
  li.setAttribute('data-key', todo.index);

  li.innerHTML = `
  <input id="${todo.index}" type="checkbox"/>
  <label for="${todo.index}" class="tick js-tick"></label>
  <span class="todo-desc" contenteditable="true">${todo.description}</span>
  <i class="fa fa-trash-alt delete"></i>
  `;

  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
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
};

const toggleDone = (key) => {
  const index = todoItems.findIndex((item) => item.index === Number(key));
  todoItems[index].completed = !todoItems[index].completed;
  renderTodo(todoItems[index]);
};

const deleteTodo = (key) => {
  // find item in the todo items array
  const index = todoItems.findIndex((item) => item.index === Number(key));

  // create new object with a deleted property
  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  // remove todo item from array
  todoItems = todoItems.filter((item) => item.index !== Number(key));
  renderTodo(todo);
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

// select entire list
let list = document.querySelector('.todo-list');

// Add a click event listener to the list and its children
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-tick')) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

// edit task descriptions

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    const icon = e.target;
    const li = icon.parentElement;
    list = li.parentElement;
  }
  if (icon.className === 'fa-edit') {
    const span = document.querySelector('.todo-desc');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    li.insertBefore(input, span);
  }
});

// add click event listener to trash icon
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    console.log('delete');
    const itemKey = e.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});