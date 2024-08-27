document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', modifyTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };
    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.querySelector('#task-list');
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function modifyTask(e) {
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id == id);

    if (e.target.tagName === 'BUTTON') {
        if (e.target.textContent === 'Delete') {
            li.remove();
            const updatedTasks = tasks.filter(task => task.id != id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } else if (e.target.textContent === 'Edit') {
            const newText = prompt('Edit task:', task.text);
            if (newText) {
                task.text = newText;
                li.querySelector('span').textContent = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    } else if (e.target.tagName === 'INPUT') {
        task.completed = e.target.checked;
        li.classList.toggle('completed');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
