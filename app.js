// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".task-add");
const addButton = document.querySelector(".task__btn-add");
const incompleteTaskHolder = document.querySelector(".task__list-incomplete");
const completedTasksHolder = document.querySelector(".task__list-complete");

// New task list items creation
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  // New task list elements description
  listItem.className = "task__item";

  checkBox.type = "checkbox";
  checkBox.className = "task__chk";

  label.innerText = taskString;
  label.className = "task__output";

  editInput.type = "text";
  editInput.className = "task__input";

  editButton.innerText = "Edit";
  editButton.className = "task__btn task__btn-modify";

  deleteButton.className = "task__btn task__btn-delete";
  deleteButton.append(deleteButtonImg);
  deleteButtonImg.className = "task__btn-img";
  deleteButtonImg.src = "./remove.svg";

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from task-add:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Edit existing task.
const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__output");
  const editBtn = listItem.querySelector(".task__btn-modify");
  const containsClass = listItem.classList.contains("modify");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("modify");
};

// Delete existing task.
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

// Mark task as completed
const taskCompleted = function () {
  console.log("Complete Task...");

  // Append the marked task to Completed Tasks
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to Incomplete Tasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log("AJAX Request");
};

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // select ListItems children
  const checkBox = taskListItem.querySelector(".task__chk");
  const editButton = taskListItem.querySelector(".task__btn-modify");
  const deleteButton = taskListItem.querySelector(".task__btn-delete");

  // Bind editTask with edit button.
  editButton.onclick = editTask;
  // Bind deleteTask with delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted with checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

// cycle over incompleteTaskHolder list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  // bind events with list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  // bind events with list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks.

// Change edit to save when you are in edit mode.
