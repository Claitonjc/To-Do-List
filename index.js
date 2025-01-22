const taskInput = document.querySelector("#task");
const clearButton = document.querySelector(".remove__list");
const taskList = document.querySelector(".task__list");

const addTask = (taskContent) => {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task__item");
  taskItem.innerHTML += `
        <div class="task__content-container">
          <div class="task__content">
                <input type="checkbox" class="task__check">
                <h3>${taskContent}</h3>
          </div>
                <button class="deleteItem" type="button">X</button>
        </div>
        <hr>
    `;
  taskList.appendChild(taskItem);
  saveTasks();
};

const clearTasks = () => {
    taskList.innerHTML = "";
    saveTasks();
};

const saveTasks = () => {
  localStorage.setItem('taskList', taskList.innerHTML);
  saveCheckboxState();
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem('taskList');
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
    loadCheckBoxState();
  }
};

const saveCheckboxState = () => {
  const checkBoxes = document.querySelectorAll(".task__check");
  const checkBoxStates = Array.from(checkBoxes).map((checkBox) => checkBox.checked);
  localStorage.setItem("checkBoxStates", JSON.stringify(checkBoxStates));
}

const loadCheckBoxState = () => {
  const checkBoxStates = JSON.parse(localStorage.getItem("checkBoxStates"));
  if(checkBoxStates) {
    const checkBoxes = document.querySelectorAll(".task__check");
    checkBoxes.forEach((checkBox, index) => {
      checkBox.checked = checkBoxStates[index];
    });
  }
}

const handleTaskInput = (e) => {
  if(e.key === "Enter" && taskInput.value.trim() !== "") {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
}

const handleTaskListClick = (e) => {
  if(e.target.classList.contains("deleteItem")) {
    e.target.closest(".task__item").remove();
    saveTasks();
  }
}

const handleCheckboxChange = (e) => {
  if(e.target.classList.contains("task__check")) {
    saveCheckboxState();
  }
}

taskInput.addEventListener("keypress", handleTaskInput);
taskList.addEventListener("click", handleTaskListClick);
document.addEventListener("change", handleCheckboxChange);
clearButton.addEventListener("click", clearTasks);

loadTasks();

