const newTask = document.getElementById('new-task');
const addButton = document.getElementById('add-btn');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');

  const label = document.createElement('label');

  const editInput = document.createElement('input');

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task-item';

  label.textContent = taskString;
  label.className = 'task task-item__label';

  checkBox.type = 'checkbox';
  checkBox.className = 'task-item__checkbox';
  editInput.type = 'text';
  editInput.className = 'task task-item__input';

  editButton.textContent = 'Edit';
  editButton.className = 'btn edit';

  deleteButton.className = 'btn delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'delete-button';
  deleteButtonImg.className = 'btn-delete-img';
  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTask.value) return;
  const listItem = createNewTaskElement(newTask.value);

  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTask.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsEditModeClass = listItem.classList.contains('edit-mode');

  if (containsEditModeClass) {
    label.textContent = editInput.value;
    editBtn.textContent = 'Edit';
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
