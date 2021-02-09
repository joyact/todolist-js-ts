const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// create a new task > save in object > convert to HTML
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

function createList(name) {
  return {
    id: Date.now(),
    name: name,
    tasks: [],
  };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function render() {
  // remove current DOM elements
  clearElements(listContainer);

  // create new li elements
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-name');
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
