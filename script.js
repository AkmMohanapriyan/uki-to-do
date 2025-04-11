// Load tasks and history from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    // loadHistory();
});

// Arrays to store tasks and history
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// let history = JSON.parse(localStorage.getItem('history')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(), // Unique ID for each task
        text: taskText,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    // Clear the input field
    taskInput.value = '';
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Priority indicator
        const priorityIndicator = document.createElement('div');
        priorityIndicator.classList.add('priority-indicator', task.priority);

        // Checkbox to mark task as completed

        const checkbox = document.createElement('span');
        checkbox.textContent = "";
        checkbox.addEventListener('change', () => {

            saveTasks();
            renderTasks();
        });

        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        // Delete button

        const deleteBtn = document.createElement('input');
        deleteBtn.type = 'checkbox';
        deleteBtn.classList="dltBtn"
        // deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        // Append elements to task item
        taskItem.appendChild(priorityIndicator);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        // Append task item to the task list
        taskList.appendChild(taskItem);
    });
}

// function moveToHistory(task) {
//     history.push({ ...task, completedAt: new Date().toLocaleString() });
//     tasks = tasks.filter(t => t.id !== task.id);
//     saveTasks();
//     saveHistory();
//     renderHistory();
// }

// function renderHistory() {
//     const historyList = document.getElementById('historyList');
//     historyList.innerHTML = '';

//     history.forEach(item => {
//         const historyItem = document.createElement('div');
//         historyItem.classList.add('task-item');

//         const priorityIndicator = document.createElement('div');
//         priorityIndicator.classList.add('priority-indicator', item.priority);

//         const historyText = document.createElement('span');
//         historyText.textContent = `${item.text} (Completed: ${item.completedAt})`;

//         historyItem.appendChild(priorityIndicator);
//         historyItem.appendChild(historyText);
//     });
// }

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
}
