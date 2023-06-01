const input = document.querySelector('#msg');
const addButton = document.querySelector('.add-new button');
const taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
const taskCtn = document.querySelector('.task-ctn');



// ADD NEW TASK

addButton.addEventListener('click', verifyMsg);

function verifyMsg() {
    let msg = input.value;
    console.log(input.value);
    if (msg == '') {
        input.setAttribute('placeholder','Text must not be empty!')
    } else {
        addTask(msg);
    }
}

function addTask(msg) {
    input.value = '';
    input.focus();
    input.setAttribute('placeholder','Add a new task...');
    taskArray.push(msg);
    draw();
}

function draw() {
    taskCtn.innerHTML = '';
    taskArray.forEach((item,index) => {
        taskCtn.innerHTML = `
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
    document.querySelectorAll('.checkbox').forEach((item) => {
        item.addEventListener('click', changeStatus);
    });
    document.querySelectorAll('i.fa-pen-to-square').forEach(item => {
        item.addEventListener('click', editTask);
    });
    document.querySelectorAll('i.fa-trash').forEach(item => {
        item.addEventListener('click', removeTask);
    })
}

//CHANGE STATUS - MARK AS DONE

function changeStatus() {
    if (this.parentNode.parentNode.classList.contains('ongoing')) {
        this.parentNode.parentNode.classList.remove('ongoing');
        this.parentNode.parentNode.classList.add('done');
        let movedTask = this.parentNode.parentNode;
        movedTask.parentNode.removeChild(movedTask);
        taskCtn.append(movedTask)
    } else {
        this.parentNode.parentNode.classList.remove('done');
        this.parentNode.parentNode.classList.add('ongoing');
        let movedTask = this.parentNode.parentNode;
        movedTask.parentNode.removeChild(movedTask);
        taskCtn.prepend(movedTask)
    }
}

//EDIT TASK

function editTask(event) {
    let task = event.target.parentNode.parentNode;
    task.classList.add('focus');
    input.focus();
    input.value = task.querySelector('.task-title').innerText;
    addButton.removeEventListener('click', verifyMsg);
    addButton.addEventListener('click', ()=> {updateTask(task)});
}

function updateTask(task) {
    let msg = input.value;
    if (msg == '') {
        input.setAttribute('placeholder','Text must not be empty!')
    } else {
        for (let i = 0; i < taskArray.length; i++) {
            if (task.querySelector('.task-title').innerText == taskArray[i]) {
                taskArray.splice(i,1, msg);
            }
        }
        draw();
        task.classList.remove('focus');
        input.value = '';
        input.focus();
        addButton.addEventListener('click', verifyMsg);
        // error cho nay cai verifyMsg khong bat duoc input.value
    }
} 

//REMOVE TASK

function removeTask(event) {
    let task = event.target.parentNode.parentNode;
    for (let i = 0; i < taskArray.length; i++) {
        if (task.querySelector('.task-title').innerText == taskArray[i]) {
            taskArray.splice(i,1)
        }
    }
    draw();
    input.focus();
}


