import './style.css';

const storageData = localStorage.getItem('todoItems');
// Array to hold todo list items
let todoItems = (storageData) ? JSON.parse(localStorage.getItem('todoItems')) : [];

const renderTodo = () => {
  // local storage

  let ulHTML = '';
  todoItems.forEach((item) => {
    // check if todo is completed
    const isCompleted = item.completed ? 'done' : '';

    // create html for todo item
    ulHTML += `
  <li class="todo-item ${isCompleted}" data-key="${item.index}">
  <input id="${item.index}" type="checkbox"/>
  <label for="${item.index}" class="tick js-tick"></label>
  <span class="todo-desc">${item.description}</span>
  <button class="edit" id="editBtn" type="button">Edit</button>
  <i class="fa fa-trash-alt delete"></i>
  </li>
  `;
  });
  // append todo items to the list
  document.querySelector('.todo-list').innerHTML = ulHTML;
};

// Function to create new todo object
const addTodo = (description) => {
  // create new todo object
  todoItems.push({
    description,
    completed: false,
    index: todoItems.length,
  });

  // save to local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  renderTodo();
};

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

  // update the index of the remaining todo items
  todoItems.forEach((item, i) => {
    item.index = i;
  });

  // save to local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  // render the todo list
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
const list = document.querySelector('.todo-list');

// Add a click event listener to the list and its children
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-tick')) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

// edit task descriptions
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    // Add contenteditable attribute to the task
    e.target.parentElement.querySelector('.todo-desc').setAttribute('contenteditable', 'true');
  }
});

// create event listener for clear button
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
  // delete all completed tasks from todoItems array
  todoItems = todoItems.filter((item) => !item.completed);
  // reorder the index of the remaining tasks
  todoItems.forEach((item, index) => {
    item.index = index;
  });
  // update todoItems array in local storage
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
});

// create an event listener for each task
list.addEventListener('keypress', (e) => {
  if (e.target.classList.contains('todo-desc') && e.key === 'Enter') {
    // Get the current value of the task description
    const description = e.target.innerText;
    // Update specific task in the task object
    const itemKey = e.target.parentElement.dataset.key;
    const index = todoItems.findIndex((item) => item.index === Number(itemKey));
    todoItems[index].description = description;
    // Update local storage
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }
});

// add click event listener to trash icon
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const itemKey = e.target.parentElement.dataset.key;
    // reorder the index of the remaining tasks
    todoItems.forEach((item, index) => {
      item.index = index;
    });

    // update local storage
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    // delete task
    deleteTodo(itemKey);
    renderTodo();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});