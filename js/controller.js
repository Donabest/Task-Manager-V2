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
saveTask.addEventListener("click", (e) => {
  const input = document.querySelectorAll(".input");
  const select = document.querySelectorAll(".select");
  select.forEach((option) => {
    option.addEventListener("change", function (e) {
      const selectedValue = e.target.value;
      console.log(selectedValue);
    });
  });
  input.forEach((input) => console.log(input.value));
  //   console.log(input);
  //   console.log(form);
});
