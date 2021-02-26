import React, { useEffect } from 'react';

function Todolist() {
  useEffect(() => {
    const listContainer = document.querySelector('[data-lists]');
    const newListForm = document.querySelector('[data-list-form]');
    const newListInput = document.querySelector('[data-list-input]');
    const taskBox = document.querySelector('[data-task-box]');
    const taskNone = document.querySelector('[data-task-empty]');
    const taskTitle = document.querySelector('[data-task-title]');
    const taskCount = document.querySelector('[data-task-count]');
    const taskContainer = document.querySelector('[data-tasks]');
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

      if (lists) {
        activeListId = list.id;
      }

      lists.unshift(list);
      newListInput.value = '';

      renderLists();
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
      console.log(lists);

      if (lists) {
        activeListId = lists[0].id;
      }

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
      let activeList = lists.find((list) => list.id === activeListId);
      let lastAdded = lists[0];

      if (activeList == null && lastAdded) {
        activeList = lastAdded;
      }

      if (activeList == null) {
        taskBox.style.display = 'none';
        taskNone.style.display = 'block';
      } else {
        taskBox.style.display = 'block';
        taskNone.style.display = 'none';
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
        const taskElement = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const span = document.createElement('span');

        checkbox.type = 'checkbox';
        span.classList.add('custom-checkbox');
        checkbox.id = task.id;
        checkbox.checked = task.isComplete;
        label.htmlFor = task.id;
        label.append(span, task.task);
        taskElement.classList.add('task');
        taskElement.append(checkbox, label);
        taskContainer.append(taskElement);
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
        <form action="" data-list-form className="list-form">
          <h2 className="list-title">Project Title : </h2>
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
      <div className="task-empty" data-task-empty>
        <p>Add a new project</p>
      </div>
      <div className="task-wrapper" data-task-box>
        <div className="task-header">
          <h2 className="task-title" data-task-title></h2>
          <p className="task-count" data-task-count></p>
        </div>
        <div className="task-body">
          <div className="add-task">
            <div className="tasks" data-tasks></div>
            <form action="" className="task-form" data-task-form>
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
  );
}

export default Todolist;
