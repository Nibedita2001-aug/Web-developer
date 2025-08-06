let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
  function toggleTask(id) {
    tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
 }
  function editTask(id) {
    const newText = prompt('Edit task:', tasks.find(task => task.id === id).text);
    if (newText !== null && newText.trim() !== '') {

       tasks = tasks.map(task => 
       task.id === id ? { ...task, text: newText.trim() } : task

       );
       renderTasks();
    }
}
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                onchange="toggleTask(${task.id})">
                <span class="task-text" ondblclick="editTask(${task.id})">${task.text}</span>
                <div class="task-actions">
                        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;  
            taskList.appendChild(li);
            });
        }

        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });
                

