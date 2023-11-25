// tasks.js

let editingTaskId = null;

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editingTaskId) {
        const task = tasks.find(task => task.id === editingTaskId);
        task.name = document.getElementById('task-name').value;
        task.days = document.getElementById('task-days').value;
        task.startDate = document.getElementById('task-start-date').value;
        task.endDate = document.getElementById('task-end-date').value;
        task.responsible = document.getElementById('task-responsible').value;
        editingTaskId = null;
    } else {
        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            name: document.getElementById('task-name').value,
            days: document.getElementById('task-days').value,
            startDate: document.getElementById('task-start-date').value,
            endDate: document.getElementById('task-end-date').value,
            responsible: document.getElementById('task-responsible').value,
        };
        tasks.push(newTask);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTaskList();
    document.getElementById('task-form').reset();
});

document.getElementById('task-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const idToDelete = parseInt(event.target.getAttribute('data-id'));

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== idToDelete);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadTaskList();
    }

    if (event.target.classList.contains('edit')) {
        const idToEdit = parseInt(event.target.getAttribute('data-id'));
        const taskToEdit = JSON.parse(localStorage.getItem('tasks')).find(task => task.id === idToEdit);

        document.getElementById('task-name').value = taskToEdit.name;
        document.getElementById('task-days').value = taskToEdit.days;
        document.getElementById('task-start-date').value = taskToEdit.startDate;
        document.getElementById('task-end-date').value = taskToEdit.endDate;
        document.getElementById('task-responsible').value = taskToEdit.responsible;

        editingTaskId = idToEdit;
    }
});

function loadTaskList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListElement = document.getElementById('task-list');

    // Limpiar la lista de tareas existente
    taskListElement.innerHTML = '';

    // Generar nuevo HTML para cada tarea
    tasks.forEach(function(task) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.days}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate}</td>
            <td>${task.responsible}</td>
            <td>
                <button class="delete" data-id="${task.id}">Eliminar</button>
                <button class="edit" data-id="${task.id}">Editar</button>
            </td>
        `;
        taskListElement.appendChild(row);
    });
}

// Cargar la lista de tareas al iniciar la página
loadTaskList();
