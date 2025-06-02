import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default function initializeTaskManager() {
    const listsContainer = document.querySelector('[data-container="lists"]')
    const tasksContainer = document.querySelector('[data-container="tasks"]')
    const newListForm = document.querySelector('[data-container="new-list-form"]')
    const newTaskForm = document.querySelector('[data-container="new-task-form"]')

    const state = {
        lists: ['General'],
        tasks: {
            General: []
        },
        currentList: 'General'
    }
    function renderLists() {
        const ul = document.createElement('ul')

        state.lists.forEach(listName => {
            const li = document.createElement('li')

            if (listName === state.currentList) {
                const strong = document.createElement('strong')
                strong.textContent = listName
                li.appendChild(strong)
            } else {
                const link = document.createElement('a')
                link.href = `#${listName.toLowerCase()}`
                link.textContent = listName
                link.addEventListener('click', (e) => {
                    e.preventDefault()
                    state.currentList = listName
                    renderAll()
                })
                li.appendChild(link)
            }

            ul.appendChild(li)
        })
        listsContainer.innerHTML = ''
        listsContainer.appendChild(ul)
    }

    function renderTasks() {
        const currentTasks = state.tasks[state.currentList] || []
        if (currentTasks.length === 0) {
            tasksContainer.innerHTML = ''
            return
        }

        const ul = document.createElement('ul')
        currentTasks.forEach(task => {
            const li = document.createElement('li')
            li.textContent = task
            ul.appendChild(li)
        })
        tasksContainer.innerHTML = ''
        tasksContainer.appendChild(ul)
    }
    function renderAll() {
        renderLists()
        renderTasks()
    }

    newListForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const input = e.target.elements.name
        const newListName = input.value.trim()

        if (newListName && !state.lists.includes(newListName)) {
            state.lists.push(newListName)
            state.tasks[newListName] = []
            input.value = ''
            renderAll()
        }
    })
    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const input = e.target.elements.name
        const newTaskName = input.value.trim()

        if (newTaskName) {
            state.tasks[state.currentList].push(newTaskName)
            input.value = ''
            renderTasks()
        }
    })
    renderAll()
}
// END