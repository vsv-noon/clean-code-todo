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
  bindTaskEvents(listItem);

  newTask.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-item__input');
  const label = listItem.querySelector('.task-item__label');
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

const toggleTaskCompletionStatus = function () {
  const listItem = this.parentNode;
  const targetHolder = this.checked
    ? completedTasksHolder
    : incompleteTaskHolder;
  targetHolder.append(listItem);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('.task-item__checkbox');
  const editButton = taskListItem.querySelector('.edit');
  const deleteButton = taskListItem.querySelector('.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskCompletionStatus;
};

for (const task of [
  ...incompleteTaskHolder.children,
  ...completedTasksHolder.children,
]) {
  bindTaskEvents(task);
}
