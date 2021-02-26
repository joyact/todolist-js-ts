import React, { useEffect } from 'react';

function Todolist() {
  useEffect(() => {
    const listContainer = document.querySelector('[data-lists]');
    const newListForm = document.querySelector('[data-list-form]');
    const newListInput = document.querySelector('[data-list-input]');
    const taskBox = document.querySelector('[data-task-box]');
    const taskTitle = document.querySelector('[data-task-title]');
    const taskCount = document.querySelector('[data-task-count]');
    const taskContainer = document.querySelector('[data-tasks]');
    const taskTemplate = document.getElementById('task-template');
    const newTaskForm = document.querySelector('[data-task-form]');
    const newTaskInput = document.querySelector('[data-task-input]');
    const deleteButton = document.querySelector('[data-delete-btn');
    const clearCompleteButton = document.querySelector('[data-clear-btn');

    const LOCAL_LIST_KEY = 'task.lists';
    const LOCAL_ACTIVE_LIST_KEY = 'task.activeList';
    let lists = JSON.parse(localStorage.getItem(LOCAL_LIST_KEY)) || [];
    let activeListId = localStorage.getItem(LOCAL_ACTIVE_LIST_KEY);

    // get the selected li element's id
    listContainer.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        activeListId = e.target.dataset.listId;
      }
      saveAndRender();
    });

    // toggle checkbox
    taskContainer.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') {
        const activeList = lists.find((list) => list.id === activeListId);
        const clickedTask = activeList.tasks.find(
          (task) => task.id === e.target.id
        );
        clickedTask.isComplete = e.target.checked;
        save();
        getTaskInfo(activeList);
      }
    });

    // create a new list object when submitted
    newListForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const listName = newListInput.value;
      if (listName == null || listName === '') return;

      const list = createList(listName);
      lists.push(list);
      newListInput.value = '';

      saveAndRender();
    });

    // create a new task object when submitted
    newTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeList = lists.find((list) => list.id === activeListId);
      const taskName = newTaskInput.value;

      if (taskName == null || taskName === '') return;
      const task = createTask(taskName);
      activeList.tasks.push(task);
      newTaskInput.value = '';

      saveAndRender();
    });

    // delete the completed tasks
    clearCompleteButton.addEventListener('click', (e) => {
      const activeList = lists.find((list) => list.id === activeListId);
      activeList.tasks = activeList.tasks.filter((task) => !task.isComplete);
      saveAndRender();
    });

    // delete current list
    deleteButton.addEventListener('click', (e) => {
      lists = lists.filter((list) => list.id !== activeListId);
      saveAndRender();
    });

    // list data
    function createList(name) {
      return {
        id: Date.now().toString(),
        name: name,
        tasks: [],
      };
    }

    // task data
    function createTask(task) {
      return {
        id: Date.now().toString(),
        task: task,
        isComplete: false,
      };
    }

    // count the current tasks
    function getTaskInfo(target) {
      const incompleteTask = target.tasks.filter((task) => !task.isComplete)
        .length;
      const taskString =
        incompleteTask === 0 || incompleteTask === 1 ? 'task' : 'tasks';
      taskTitle.innerHTML = target.name;
      taskCount.innerHTML = `${incompleteTask} ${taskString} remaining`;
    }

    function saveAndRender() {
      save();
      render();
    }

    // save information on localStorage
    function save() {
      localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(lists));
      localStorage.setItem(LOCAL_ACTIVE_LIST_KEY, activeListId);
    }

    // render the page
    function render() {
      clearElements(listContainer); // remove current DOM elements
      renderLists(); // Represent list data into DOM

      // render task container when the list is selected
      const activeList = lists.find((list) => list.id === activeListId);

      if (activeList == null) {
        taskBox.style.display = 'none';
      } else {
        taskBox.style.display = 'block';
        getTaskInfo(activeList);
        clearElements(taskContainer); // remove current DOM elements
        renderTasks(activeList); // Represent task data into DOM
      }
    }

    // create new li elements
    function renderLists() {
      lists.forEach((list) => {
        const listElement = document.createElement('li');
        listElement.classList.add('list-name');
        listElement.dataset.listId = list.id;
        if (list.id === activeListId) {
          listElement.classList.add('active');
        }
        listElement.innerHTML = list.name;
        listContainer.appendChild(listElement);
      });
    }

    // create a new task by the template
    function renderTasks(activeList) {
      activeList.tasks.forEach((task) => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        const label = taskElement.querySelector('label');

        // checkbox.id = task.id;
        // checkbox.checked = task.isComplete;
        // label.htmlFor = task.id;
        // label.append(task.task);
        taskContainer.appendChild(taskElement);
      });
    }

    // remove child elements in the target
    function clearElements(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    render();
  }, []);

  return (
    <div className="todolist">
      <div className="list-wrapper">
        <h2 className="list-title">Project Title</h2>
        <form action="" data-list-form>
          <input
            type="text"
            className="new list"
            placeholder="new project name"
            aria-label="new list name"
            data-list-input
          />
          <button className="btn add" aria-label="add new list">
            +
          </button>
        </form>
        <ul className="lists" data-lists></ul>
      </div>
      <div className="task-wrapper" data-task-box>
        <div className="task-header">
          <h2 className="task-title" data-task-title></h2>
          <p className="task-count" data-task-count></p>
        </div>
        <div className="task-body">
          <div className="tasks" data-tasks></div>
          <div className="add-task">
            <form action="" data-task-form>
              <input
                type="text"
                className="new todo"
                placeholder="new task name"
                aria-label="new task name"
                data-task-input
              />
              <button className="btn add" aria-label="add new task">
                +
              </button>
            </form>
          </div>
          <div className="delete-task">
            <button className="btn delete" data-clear-btn>
              Clear completed tasks
            </button>
            <button className="btn delete" data-delete-btn="">
              Delete list
            </button>
          </div>
        </div>
      </div>
      <template id="task-template">
        <div className="task">
          <input type="checkbox" />
          <label>
            <span className="custom-checkbox"></span>
          </label>
        </div>
      </template>
    </div>
  );
}

export default Todolist;
