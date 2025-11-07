const addTaskBtn = document.querySelector(".btn-task");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close--modal");
const sideBar = document.querySelector(".sidebar-section");
const hamburger = document.querySelector(".hamburger-menu");
const closeSidebar = document.querySelector(".cancel-sidebar");
const addProjectInput = document.querySelector(".add-project");
const addProjectBtn = document.querySelector(".project-btn");
const selectionList = document.querySelector(".opt-content");
const saveTask = document.querySelector(".save-task--btn");

const form = document.querySelector(".form");

addTaskBtn.addEventListener("click", function (e) {
  modal.classList.toggle("show");
});

closeModal.addEventListener("click", (e) => {
  modal.classList.toggle("show");
});

hamburger.addEventListener("click", (e) => {
  sideBar.classList.toggle("show");
});

closeSidebar.addEventListener("click", (e) => {
  sideBar.classList.toggle("show");
});

addProjectBtn.addEventListener("click", (e) => {
  addProjectInput.classList.add("show");
});

selectionList.addEventListener("click", (e) => {
  const target = e.target.closest(".item");
  console.log(target);
  if (!target) return;
});
const tasks = [];
saveTask.addEventListener("click", (e) => {
  e.preventDefault();
  const inputTitle = document.querySelector(".title-input");
  const descriptionInput = document.querySelector(".description--input");
  const dateInput = document.querySelector(".date--input");
  const priorityInput = document.querySelector(".priority-input");
  const projectInput = document.querySelector(".project-input");
  const labelInput = document.querySelector(".label--input");
  tasks.push({
    title: inputTitle.value,
    description: descriptionInput.value,
    date: dateInput.value,
    priority: priorityInput.value,
    project: projectInput.value,
    label: labelInput.value,
    favorite: false,
  });
  renderUi(tasks[tasks.length - 1]);

  form.reset();

  projectInput.selectedIndex = 0;
  priorityInput.selectedIndex = 0;

  modal.classList.toggle("show");
});

function renderUi(task) {
  console.log(task.priority);
  console.log(task.project);
  const markUp = `
       <li class="${task.priority}-list">
            <div class="list">
                <div class="check-list">
                    <input type="checkbox" name="checkbox" id="checkbox" />
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
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-pen-to-square"></i>
                  <i class="fa-solid fa-trash-can"></i>
                </div>
        </li>
    `;
  const taskList = document.querySelector(".task--list");
  // const msg = document.querySelector(".task-msg");
  // msg.innerHTML = "";
  taskList.innerHTML = "";
  taskList.insertAdjacentHTML("beforeend", markUp);
}
