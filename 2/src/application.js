import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const taskForm = document.querySelector('.form-inline');
  const taskInput = taskForm.querySelector('input[name="name"]');
  const taskList = document.getElementById('tasks');

  const fetchTasks = async () => {
      const response = await axios.get(routes.tasksPath())
      taskList.innerHTML = '';
      const tasks = response.data.items;
      tasks.reverse().forEach(task => {
        taskList.insertAdjacentHTML(
            'afterbegin',
            `<li class="list-group-item">${task.name}</li>`
        )
      })
  }
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const taskName = taskInput.value.trim()
    if (!taskName) return
      const response = await axios.post(routes.tasksPath(), { name: taskName })
      if (response.status === 201) {
        taskList.insertAdjacentHTML(
            'afterbegin',
            `<li class="list-group-item">${taskName}</li>`
        );
        taskInput.value = ''
    }
  })
  await fetchTasks()
}
// END