document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    //Function to save tasks to Local Storage
    function saveTasks(){
        const tasks = [];
        taskList.childNodes.forEach(item => {
            tasks.push(item.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Create task list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        // removeButton.className = 'remove-btn';
        // removeButton.onclick = function() {
        //     taskList.removeChild(listItem);
        //     saveTasks();
        // };
        removeButton.classList.add('remove-btn');

        //Assign an onclick event to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            saveTasks();
        }
        // Append remove button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Save tasks to local storage if required
        if (save) {
            saveTasks();
        }
    }

    // // Function to save tasks to local storage
    // function saveTasks() {
    //     const tasks = [];
    //     taskList.childNodes.forEach(item => {
    //         tasks.push(item.firstChild.textContent);
    //     });
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    // // Function to load tasks from local storage
    // function loadTasks() {
    //     const tasks = JSON.parse(localStorage.getItem('tasks'));
    //     if (tasks) {
    //         tasks.forEach(taskText => {
    //             const listItem = document.createElement('li');
    //             listItem.textContent = taskText;

    //             const removeButton = document.createElement('button');
    //             removeButton.textContent = 'Remove';
    //             removeButton.className = 'remove-btn';
    //             removeButton.onclick = function() {
    //                 taskList.removeChild(listItem);
    //                 saveTasks();
    //             };

    //             listItem.appendChild(removeButton);
    //             taskList.appendChild(listItem);
    //         });
    //     }
    // }

    // // Event listeners for adding tasks
    // addButton.addEventListener('click', addTask);
    // taskInput.addEventListener('keypress', function(event) {
    //     if (event.key === 'Enter') {
    //         addTask();
    //     }
    // });
    // addButton.addEventListener('clcik',() => addTask(taskInput.value.trim()))
    // Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });
    // Load tasks from local storage on page load,
    loadTasks();
});
