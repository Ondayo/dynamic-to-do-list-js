// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a task to the list
  function addTask() {
    // Retrieve and trim the task input value
    const taskText = taskInput.value.trim();

    // Validate the input: ensure it's not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item element
    const listItem = document.createElement("li");

    // Create a text node for the task text and append it to the list item
    const taskTextNode = document.createTextNode(taskText);
    listItem.appendChild(taskTextNode);

    // Create a remove button for the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Add an event listener to remove the task
    removeButton.addEventListener("click", function () {
      taskList.removeChild(listItem);
    });

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Add event listener for "Enter" keypress on the task input
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
