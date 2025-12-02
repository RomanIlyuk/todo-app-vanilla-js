const addBtn = document.querySelector('.btn--add');
const clearAllBtn = document.querySelector('.clear-all');
const inputAddTask = document.querySelector('.input-add-task');
const listContainer = document.querySelector('.list-container');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = function () {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskElement = function (taskObj) {
  const newEl = document.createElement('li');
  newEl.classList.add('list__item');
  newEl.dataset.id = taskObj.id;
  const html = `
  <input type="text" class="list__input" />
  <button class="btn btn--delete">Delete</button>
  `;
  newEl.insertAdjacentHTML('afterbegin', html);

  newEl.querySelector('.list__input').value = taskObj.text;
  return newEl;
};

const loadTasks = function () {
  tasks.forEach(task => {
    const el = createTaskElement(task);
    listContainer.append(el);
  });
};

loadTasks();

const addTask = function () {
  // 1) Check if input field is empty
  const checkEmptyField = inputAddTask.value.trim();
  if (checkEmptyField === '') {
    console.log('Input field is empty! Please try again 😓');
    return;
  }

  // 2) Create a task object
  const taskObj = {
    id: Date.now(),
    text: inputAddTask.value,
  };
  tasks.push(taskObj);
  saveTasks();

  // 3) Create a new element
  const el = createTaskElement(taskObj);

  // 4) Append element
  listContainer.append(el);

  // 5) Clear main input
  inputAddTask.value = '';
  inputAddTask.focus();
};

// Add a task
addBtn.addEventListener('click', addTask);
inputAddTask.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});

// Remove a task
listContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn--delete');
  if (!btn) return;

  const el = btn.closest('li');
  const id = Number(el.dataset.id);

  // 1) Remove from DOM
  el.remove();

  // 2) Remove from an array
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) tasks.splice(index, 1);

  // 3) Opdate localStorage
  saveTasks();
});

// Clear all tasks
clearAllBtn.addEventListener('click', function () {
  // 1) Clear DOM
  listContainer.innerHTML = '';

  // 2) Clear array
  tasks.length = 0;

  // 3) Clear localStorage
  saveTasks();
});
