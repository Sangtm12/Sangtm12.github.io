const input = document.querySelector("#msg");
const addButton = document.querySelector(".add-new button");
const form = document.querySelector("form.add-new");
let taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
const taskCtn = document.querySelector(".task-ctn");

document.querySelector(".clear").addEventListener("click", () => {
  window.localStorage.removeItem("taskArray");
  taskArray = [];
  draw();
});

draw();

// ADD NEW TASK

form.addEventListener("submit", verifyMsg);

function verifyMsg(e) {
  e.preventDefault();
  const msg = input.value;
  input.value = "";
  if (msg == "") {
    input.setAttribute("placeholder", "Text must not be empty!");
  } else {
    addTask(msg);
  }
}

function addTask(msg) {
  input.value = "";
  input.focus();
  input.setAttribute("placeholder", "Add a new task...");
  taskArray.unshift(msg);
  draw();
}

function draw() {
  taskCtn.innerHTML = "";
  taskArray.forEach((item) => {
    taskCtn.innerHTML =
      `
        <div class="task ongoing">
                    <div class="checkbox-ctn">
                        <input type="checkbox" name="checkbox" class="checkbox">
                    </div>
                    <div class="task-title-ctn">
                        <p class="task-title">${item}</p>
                    </div>
                    <div class="menu-icon">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                    <div class="options">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    <div class="position">
                        <i class="fa-solid fa-caret-up"></i>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                </div>
        ` + taskCtn.innerHTML;
  });

  function assignButton(selector, callback) {
    document.querySelectorAll(selector).forEach((item) => {
      item.addEventListener("click", callback);
    });
  }

  assignButton(".checkbox", changeStatus);
  assignButton("i.fa-pen-to-square", editTask);
  assignButton("i.fa-trash", removeTask);
  assignButton("i.fa-caret-up", moveUp);
  assignButton("i.fa-caret-down", moveDown);
  if (taskArray.length !== 0) {
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
  }
}

//CHANGE STATUS - MARK AS DONE

function changeStatus() {
  if (this.parentNode.parentNode.classList.contains("ongoing")) {
    this.parentNode.parentNode.classList.remove("ongoing");
    this.parentNode.parentNode.classList.add("done");
    let movedTask = this.parentNode.parentNode;
    movedTask.parentNode.removeChild(movedTask);
    taskCtn.append(movedTask);
  } else {
    this.parentNode.parentNode.classList.remove("done");
    this.parentNode.parentNode.classList.add("ongoing");
    let movedTask = this.parentNode.parentNode;
    movedTask.parentNode.removeChild(movedTask);
    taskCtn.prepend(movedTask);
  }
}

//EDIT TASK

function editTask(event) {
  let task = event.target.parentNode.parentNode;
  task.classList.add("focus");
  input.focus();
  input.value = task.querySelector(".task-title").innerText;
  form.removeEventListener("submit", verifyMsg);
  form.addEventListener("submit", updateTask);
  addButton.innerText = "Update";
}

function updateTask(e) {
  e.preventDefault();
  let task = document.querySelector(".task.focus");
  let msg = input.value;
  if (msg == "") {
    input.setAttribute("placeholder", "Text must not be empty!");
  } else {
    document.querySelectorAll(".task").forEach((item, index) => {
      if (item == task) {
        taskArray.splice(taskArray.length - 1 - index, 1, msg);
      }
    });
    draw();
    task.classList.remove("focus");
    input.focus();
    form.removeEventListener("submit", updateTask);
    form.addEventListener("submit", verifyMsg);
    addButton.innerText = "Add task";
    document.querySelector("#msg").value = "";
  }
}

//REMOVE TASK

function removeTask(event) {
  let task = event.target.parentNode.parentNode;
  for (let i = 0; i < taskArray.length; i++) {
    if (task.querySelector(".task-title").innerText == taskArray[i]) {
      taskArray.splice(i, 1);
    }
  }
  draw();
  input.focus();
}

//move task

function moveUp(event) {
  let task = event.target.parentNode.parentNode;
  for (let i = 0; i < taskArray.length; i++) {
    if (task.querySelector(".task-title").innerText == taskArray[i]) {
      if (i == taskArray.length - 1) {
        return;
      } else {
        console.log(i);
        taskArray.splice(i + 1, 0, taskArray.splice(i, 1));
        draw();
        break;
      }
    }
  }
}

function moveDown(event) {
  let task = event.target.parentNode.parentNode;
  for (let i = 0; i < taskArray.length; i++) {
    if (task.querySelector(".task-title").innerText == taskArray[i]) {
      if (i == 0) {
        return;
      } else {
        taskArray.splice(i - 1, 0, taskArray.splice(i, 1));
        draw();
      }
    }
  }
}
