const addTaskBtn = document.querySelector('.btn-task');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close--modal');
const sideBar = document.querySelector('.sidebar-section');
const hamburger = document.querySelector('.hamburger-menu');
const closeSidebar = document.querySelector('.cancel-sidebar');
const addProjectInput = document.querySelector('.add-project');
const addProjectBtn = document.querySelector('.project-btn');
const selectionList = document.querySelector('.opt-content');
const saveTask = document.querySelector('.save-task--btn');
const taskList = document.querySelector('.task--list');
const tasksConditions = document.querySelector('.opt-content');
const item = document.querySelectorAll('.item');
const form = document.querySelector('.form');
const taskMessage = document.querySelector('.message');
const addprojectList = document.querySelector('.project--list');
const optionList = document.querySelector('.project-input');
const addProject = document.querySelector('.addProject-input-form');
const msg = document.querySelector('.msg');

const state = {
  tasks: JSON.parse(localStorage.getItem('savetask')) || [],
  important: [],
  input: JSON.parse(localStorage.getItem('addproject')) || [],
};

if (state.tasks.length === 0)
  renderMessage('No tasks found. Add a new task to get started');

if (state.input.length === 0) renderProjectmsg();

addTaskBtn.addEventListener('click', function (e) {
  modal.classList.toggle('show');
});

closeModal.addEventListener('click', e => {
  modal.classList.toggle('show');
});

hamburger.addEventListener('click', e => {
  sideBar.classList.toggle('show');
});

closeSidebar.addEventListener('click', e => {
  sideBar.classList.toggle('show');
});

addProjectBtn.addEventListener('click', e => {
  addProjectInput.classList.toggle('show');
});
let currentStat = 0;
let currentView;
function updateUi() {
  if (currentView === 'important') {
    const importantFiltered = state.tasks.filter(
      task => task.favorite === true
    );

    taskMessage.innerHTML = '';
    if (importantFiltered.length === 0) renderMessage('No important task yet');

    renderUi(importantFiltered);
  } else if (currentView === 'completed') {
    const completedFiltered = state.tasks.filter(
      task => task.completed === true
    );

    taskMessage.innerHTML = '';
    if (completedFiltered.length === 0) renderMessage('No completed task yet');

    renderUi(completedFiltered);
  } else {
    taskMessage.innerHTML = '';
    if (state.tasks.length === 0)
      renderMessage('No tasks found.Add a new task to get started');
    renderUi(state.tasks);
  }
}
saveTask.addEventListener('click', e => {
  e.preventDefault();
  const inputTitle = document.querySelector('.title-input');
  const descriptionInput = document.querySelector('.description--input');
  const dateInput = document.querySelector('.date--input');
  const priorityInput = document.querySelector('.priority-input');
  const projectInput = document.querySelector('.project-input');
  const labelInput = document.querySelector('.label--input');
  const now = (Date.now() + '').slice(-7);
  const id = +now;

  state.tasks.push({
    id,
    title: inputTitle.value,
    description: descriptionInput.value,
    date: dateInput.value,
    priority: priorityInput.value,
    project: projectInput.value,
    label: labelInput.value,
    favorite: false,
    completed: false,
  });

  updateUi();

  form.reset();

  projectInput.selectedIndex = 0;
  priorityInput.selectedIndex = 0;

  modal.classList.toggle('show');

  persistance();
});

function renderUi(task) {
  const markUp = task
    .map(task => {
      return `
       <li class="${task.priority}-list" data-id="${task.id}">
            <div class="list">
                <div class="check-list">
                    <input type="checkbox" name="checkbox" id="checkbox" data-id="${
                      task.id
                    }" ${task.completed === false ? '' : 'checked'} />
                    <h2>${task.title}</h2>
                </div>
                <span class="text">${task.description}</span>
                <div class="details">
                   <span><i class="fa-solid fa-calendar"></i>${task.date}</span>
                   <span><i class="fa-solid fa-bolt"></i><span class="priority ${
                     task.priority
                   }">${task.priority.toUpperCase()}</span></span>
                </div>
            </div>
                <div class="fav">
                  <i class="fa-${
                    task.favorite === false ? 'regular' : 'solid'
                  } fa-star" data-id="${task.id}"></i>
                  <i class="fa-solid fa-pen-to-square" data-id="${task.id}"></i>
                  <i class="fa-solid fa-trash-can" data-id="${task.id}"></i>
                </div>
        </li>
    `;
    })
    .join('');
  taskList.innerHTML = '';
  taskList.insertAdjacentHTML('beforeend', markUp);
}

tasksConditions.addEventListener('click', e => {
  const target = e.target;
  const conditon = target.classList.contains('item');
  if (!conditon) return;
  if (conditon) {
    const current = document.querySelector('.current');
    current?.classList.remove('current');
    e.target.classList.add('current');
  }
  if (target.classList.contains('important--btn')) {
    currentView = 'important';
    updateUi();
  }

  if (target.classList.contains('completed--btn')) {
    currentView = 'completed';
    updateUi();
  }

  if (target.classList.contains('all--tasks-btn')) {
    currentView = 'all';
    updateUi();
  }
});

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-star');
  if (!target) return;
  const id = +target.dataset.id;
  if (!id) return;

  const task = state.tasks.find(t => t.id === id);

  task.favorite = !task.favorite;

  updateUi();
  persistance();
});
taskList.addEventListener('click', e => {
  const target = e.target.closest('#checkbox');
  if (!target) return;
  const id = +target.dataset.id;
  if (!id) return;
  const completeTask = state.tasks.find(edit => edit.id === id);
  completeTask.completed = !completeTask.completed;

  updateUi();
  persistance();
});

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-trash-can');
  if (!target) return;
  const id = +target.dataset.id;
  if (!id) return;
  const index = state.tasks.findIndex(task => task.id === id);
  state.tasks.splice(index, 1);

  updateUi();
  persistance();
});

function persistance() {
  localStorage.setItem('savetask', JSON.stringify(state.tasks));
}

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-pen-to-square');
  if (!target) return;
  const id = +target.dataset.id;

  if (!id) return;

  const editTask = state.tasks.find(edit => edit.id === id);

  modal.classList.toggle('show');
  let inputTitle = document.querySelector('.title-input');
  let descriptionInput = document.querySelector('.description--input');
  let dateInput = document.querySelector('.date--input');
  let priorityInput = document.querySelector('.priority-input');
  let projectInput = document.querySelector('.project-input');
  let labelInput = document.querySelector('.label--input');
  inputTitle.value = editTask.title;
  descriptionInput.value = editTask.description;
  dateInput.value = editTask.date;
  priorityInput.value = editTask.priority;
  projectInput.value = editTask.project;
  labelInput.value = editTask.label;

  const index = state.tasks.findIndex(task => task.id === id);
  state.tasks.splice(index, 1);
});

const sort = document.querySelectorAll('[data-sort]');
sort.forEach(sortedbtn => {
  sortedbtn.addEventListener('click', e => {
    const type = e.target.dataset.sort;
    const sorted = sortTask(state.tasks, type);
    renderUi(sorted);
  });
});

function sortTask(tasks, sortType) {
  const sorted = [...tasks];

  if (sortType === 'priority') {
    const order = { high: 3, medium: 2, low: 1 };
    sorted.sort((a, b) => order[a.priority] - order[b.priority]);
  }
  if (sortType === 'due-date') {
    sorted.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  return sorted;
}

const input = document.querySelector('.search-input');
input.addEventListener('input', e => {
  const inputValue = e.target.value.toLowerCase();
  if (inputValue.length > 0) {
    const liveSearch = state.tasks.filter(task =>
      task.title.toLowerCase().includes(inputValue)
    );
    if (liveSearch.length === 0) {
      renderMessage('No Task Found');
    }
    renderUi(liveSearch);
  } else {
    taskMessage.innerHTML = '';
    renderUi(state.tasks);
  }
  if (currentView === 'important') {
    updateUi();
  } else if (currentView === 'completed') {
    updateUi();
  }
});

function renderMessage(message) {
  const html = `
    <div class="task-msg">
      <span class="clipboard"><i class="fa-solid fa-clipboard-list"></i></span>
      <span>${message}</span>
    </div>`;
  taskMessage.innerHTML = html;
}

addProject.addEventListener('submit', e => {
  e.preventDefault();
  renderAddprojectInput(addProjectInput.value);
  addProjectPersist(addProjectInput.value);

  state.input.push(addProjectInput.value);

  addProjectPersist();

  addProjectInput.value = '';
  msg.innerHTML = '';
});

function renderProjectmsg() {
  const html = `
      <span class="project-msg">No project Yet</span>
  `;
  msg.innerHTML = html;
}

function renderAddprojectInput(input) {
  const html = `
    <li class="list">
      <span class="item">${input}</span>
      <span class="delete" data-project="${input}"><i class="fa-solid fa-trash-can"></i></span>
    </li>
  `;
  const markUp = `
     <option value="${input}">${input}</option>
  `;
  addprojectList.insertAdjacentHTML('beforeend', html);
  optionList.insertAdjacentHTML('beforeend', markUp);
}

function addProjectPersist() {
  localStorage.setItem('addproject', JSON.stringify(state.input));
}

state.input.forEach(input => {
  renderAddprojectInput(input);
});
function deleteProject(projectName) {
  state.tasks = state.tasks.filter(task => task.project !== projectName);

  state.input = state.input.filter(input => input !== projectName);
  addProjectPersist();
  persistance();

  addprojectList.innerHTML = '';
  optionList.innerHTML = '';

  state.input.forEach(input => renderAddprojectInput(input));

  renderUi(state.tasks);
}

addprojectList.addEventListener('click', e => {
  const target = e.target.closest('.item');
  const tar = e.target.closest('.delete');
  if (e.target.classList.contains('fa-trash-can')) {
    const pro = tar.dataset.project;
    deleteProject(pro);
  }
  if (!target) return;
  const projectFiltered = state.tasks.filter(
    task => task.project === target.textContent
  );

  renderUi(projectFiltered);
});

const themeToggle = document.querySelector('.theme');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  rendertheme(next);
});

document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('theme' || 'light')
);

rendertheme(localStorage.getItem('theme' || 'light'));

function rendertheme(theme) {
  themeToggle.innerHTML = `<i class="fa-${
    theme === 'light' ? 'regular' : 'solid'
  } fa-moon"></i>`;
}

renderUi(state.tasks);
