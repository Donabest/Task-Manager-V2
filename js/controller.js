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
// const
const form = document.querySelector('.form');
const state = {
  tasks: JSON.parse(localStorage.getItem('savetask')) || [],
  important: [],
};

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
  addProjectInput.classList.add('show');
});

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

  renderUi(state.tasks);

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
  if (conditon) {
    const current = document.querySelector('.current');
    console.log(target);
    current?.classList.remove('current');

    e.target.classList.add('current');
  }
});

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-star');
  const id = +target.dataset.id;
  if (!target) return;

  const task = state.tasks.find(t => t.id === id);

  task.favorite = !task.favorite;

  renderUi(state.tasks);

  persistance();
});
taskList.addEventListener('click', e => {
  const target = e.target.closest('#checkbox');
  if (!target) return;
  const id = +target.dataset.id;
  const completeTask = state.tasks.find(edit => edit.id === id);
  completeTask.completed = !completeTask.completed;
  renderUi(state.tasks);
  persistance();
});

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-trash-can');
  if (!target) return;
  const id = +target.dataset.id;
  const index = state.tasks.findIndex(task => task.id === id);
  state.tasks.splice(index, 1);
  renderUi(state.tasks);
  persistance();
});

function persistance() {
  localStorage.setItem('savetask', JSON.stringify(state.tasks));
}

taskList.addEventListener('click', e => {
  const target = e.target.closest('.fa-pen-to-square');
  const id = +target.dataset.id;

  if (!target) return;

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
renderUi(state.tasks);
