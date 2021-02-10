const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

const LOCAL_LIST_KEY = 'task.lists';
const LOCAL_ACTIVE_LIST_KEY = 'task.activeList';
let lists = JSON.parse(localStorage.getItem(LOCAL_LIST_KEY)) || [];
let activeListId = localStorage.getItem(LOCAL_ACTIVE_LIST_KEY);

// get the selected li element's id
listContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    activeListId = e.target.dataset.listId;
  }
  save();
  render();
});

// create a new list object when submitted
newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === '') return;
  const list = createList(listName);
  lists.push(list);
  newListInput.value = '';

  save(); // save on localstorage
  render(); // create DOM element on screen
});

// list template
function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

// save information on localStorage
function save() {
  localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_ACTIVE_LIST_KEY, JSON.stringify(activeListId));
}

function render() {
  // remove current DOM elements
  clearElements(listContainer);

  // create new li elements
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

function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
