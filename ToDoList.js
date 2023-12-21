const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Add an event listener to the add button
addButton.addEventListener("click", function() {
    // Get the value of the input field
    const task = taskInput.value;

    // Check if the input is not empty
    if (task) {
        // Create a new list item element
        const listItem = document.createElement("li");

        // Create a checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Add an event listener to the checkbox
        checkbox.addEventListener("change", function() {
            // Toggle the completed class on the list item
            listItem.classList.toggle("completed");
        });

        // Create a span element to hold the task text
        const span = document.createElement("span");
        span.textContent = task;

        // Create a button element to delete the task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Add an event listener to the delete button
        deleteButton.addEventListener("click", function() {
            // Remove the list item from the task list
            taskList.removeChild(listItem);

            // Update the local storage
            updateLocalStorage();
        });

        // Append the elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Update the local storage
        updateLocalStorage();
    }
});

// Define a function to update the local storage
function updateLocalStorage() {
    // Get all the list items from the task list
    const listItems = document.querySelectorAll("#task-list li");

    // Create an empty array to store the tasks
    const tasks = [];

    // Loop through the list items
    for (let i = 0; i < listItems.length; i++) {
        // Get the current list item
        const listItem = listItems[i];

        // Get the task text and the completed status
        const task = listItem.querySelector("span").textContent;
        const completed = listItem.classList.contains("completed");

        // Create an object to store the task data
        const taskData = {
            task: task,
            completed: completed
        };

        // Push the object to the tasks array
        tasks.push(taskData);
    }

    // Convert the tasks array to a JSON string
    const tasksJSON = JSON.stringify(tasks);

    // Store the JSON string in the local storage
    localStorage.setItem("tasks", tasksJSON);
}

// Define a function to load the tasks from the local storage
function loadTasks() {
    // Get the JSON string from the local storage
    const tasksJSON = localStorage.getItem("tasks");

    // Check if the JSON string is not null
    if (tasksJSON) {
        // Parse the JSON string to an array
        const tasks = JSON.parse(tasksJSON);

        // Loop through the tasks array
        for (let i = 0; i < tasks.length; i++) {
            // Get the current task object
            const taskData = tasks[i];

            // Get the task text and the completed status
            const task = taskData.task;
            const completed = taskData.completed;

            // Create a new list item element
            const listItem = document.createElement("li");

            // Create a checkbox element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = completed;

            // Add an event listener to the checkbox
            checkbox.addEventListener("change", function() {
                // Toggle the completed class on the list item
                listItem.classList.toggle("completed");
            });

            // Create a span element to hold the task text
            const span = document.createElement("span");
            span.textContent = task;

            // Create a button element to delete the task
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            // Add an event listener to the delete button
            deleteButton.addEventListener("click", function() {
                // Remove the list item from the task list
                taskList.removeChild(listItem);

                // Update the local storage
                updateLocalStorage();
            });

            // Append the elements to the list item
            listItem.appendChild(checkbox);
            listItem.appendChild(span);
            listItem.appendChild(deleteButton);

            // Add the completed class to the list item if needed
            if (completed) {
                listItem.classList.add("completed");
            }

            // Append the list item to the task list
            taskList.appendChild(listItem);
        }
    }
}

// Call the load tasks function when the document is loaded
document.addEventListener("DOMContentLoaded", loadTasks);