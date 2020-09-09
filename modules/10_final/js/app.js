const clearTODO = document.querySelector('.clearTODO');
const clearDONE = document.querySelector('.clearDONE');
const todoheader = document.getElementById('todoheader');
const doneheader = document.getElementById('doneheader');
const todoList = document.getElementById('to-do-list');
const doneList = document.getElementById('done-list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

let LIST, id;

function removeAllTodoTasks() {
  LIST.filter(task => task.done === false).forEach(task => LIST[task.id].trash = true);
}

clearTODO.addEventListener('click', function() {
  removeAllTodoTasks();
  updateLocalStorage();
  location.reload();
});

function removeAllDoneTasks() {
  LIST.filter(task => task.done === true).forEach(task => LIST[task.id].trash = true);
}

clearDONE.addEventListener('click', function() {
  removeAllDoneTasks();
  updateLocalStorage();
  location.reload();
});

todoheader.innerHTML = 'TO DO';
doneheader.innerHTML = 'DONE';

function getCurrentFormattedDate() {
  let now = new Date();
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return now.toLocaleDateString('ru-RU', options);
}

document.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    const toDo = input.value;
    const taskCreationDate = getCurrentFormattedDate();
    if (toDo) {
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
        createDate: taskCreationDate,
        dueDate: ""
      });

      addToDo(toDo, id, false, false, taskCreationDate, "");

      updateLocalStorage();

      id++;
    }
    input.value = '';
  }
});

function updateLocalStorage() {
  localStorage.setItem('TODO', JSON.stringify(LIST));
}

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  let dueDate = '';
  const isTaskDone = LIST[element.id].done;
  if (isTaskDone === false) {
    dueDate = getCurrentFormattedDate();
  }
  LIST[element.id].dueDate = dueDate;
  LIST[element.id].done = !LIST[element.id].done;
  addToDo(LIST[element.id].todo, LIST[element.id].id, LIST[element.id].done, LIST[element.id].trash, LIST[element.id].createDate, dueDate);
  updateLocalStorage();
  location.reload();
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

function editToDo(element) {
  LIST[element.id].name = myFunction(LIST[element.id].name);
  updateLocalStorage();
  location.reload();
}

function myFunction(name) {
  const newName = prompt("Please enter new name for a task:", name);
  return newName ? newName : name;
}

[todoList, doneList].forEach(element =>
    element.addEventListener('dblclick', event  => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'edit') {
    editToDo(element);
  }
}))

[todoList, doneList].forEach(element =>
    element.addEventListener('click', event  => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'complete') {
    completeToDo(element);
  } else if (elementJob === 'delete') {
    removeToDo(element);
  }
      updateLocalStorage();
}))

const updateResult = query => {
  let data = localStorage.getItem('TODO');
  if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    if (query) {
      LIST = LIST.filter(element => !element.trash && element.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    doneList.innerHTML = '';
    todoList.innerHTML = '';
    LIST.forEach(item => addToDo(item.name, item.id, item.done, item.trash, item.createDate, item.dueDate));
  } else {
    LIST = [];
    id = 0;
  }
};

function addToDo(toDo, id, done, trash, createDate, dueDate) {

  if (trash) {return;}
  let taskDueDate = ""
  if (dueDate) {
    taskDueDate = '<br/>Due: ' + dueDate;
  }
  let taskInfo = toDo + '<br/>Created: ' + createDate + taskDueDate;
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';

  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" job="edit" id="${id}">${taskInfo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
`;

  const position = 'beforeend';
  if (done === true) {
    doneList.insertAdjacentHTML(position, item);
  } else {
    todoList.insertAdjacentHTML(position, item);
  }
}

updateResult('');
