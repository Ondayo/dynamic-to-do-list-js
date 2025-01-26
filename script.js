// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks without saving to avoid duplication
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            tasks.push(listItem.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        // Validate input
        if (!taskText.trim()) {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');

        // Add task text
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add event listener to the remove button
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removing a task
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if save is true
        if (save) {
            saveTasks();
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add event listener for the "Enter" keypress
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks when the page is ready
    loadTasks();
});
