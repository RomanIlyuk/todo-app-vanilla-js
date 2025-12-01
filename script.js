const addBtn = document.querySelector('.btn--add');
const inputAddTask = document.querySelector('.input-add-task');
const listContainer = document.querySelector('.list-container');

const addTask = function () {
  // 1) Check if input field is empty
  const checkEmptyField = inputAddTask.value.trim();
  if (checkEmptyField === '') {
    console.log('Input field is empty! Please try again 😓');
    return;
  }

  // 2) Create a new element
  const newEl = document.createElement('li');
  newEl.classList.add('list__item');
  const html = `
  <input type="text" class="list__input" />
  <button class="btn btn--delete">Delete</button>
  `;
  newEl.insertAdjacentHTML('afterbegin', html);

  // 3) Insert text before append
  const inputInside = newEl.querySelector('.list__input');
  inputInside.value = inputAddTask.value;

  // 4) Append element
  listContainer.append(newEl);

  // 5) Clear main input
  inputAddTask.value = '';
  inputAddTask.focus();
};

addBtn.addEventListener('click', addTask);

listContainer.addEventListener('click', function (e) {
  const item = e.target.closest('button');
  if (!item) return;
  const el = e.target.closest('li');
  if (el) el.remove();
});

inputAddTask.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});
