const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoitemList = document.querySelector('.todo-items');

let todos = [];

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});


function addTodo(item) {
    if (item !== '') {

        const todo = {
            id: Date.now(),
            name: item,
            complete: false
        };
        todos.push(todo);

        addToLocalStorage(todos);
        todoInput.value = "";
    }
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function renderTodos(todos) {
    todoitemList.innerHTML = "";
    todos.forEach(function (item) {

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);


        li.innerHTML = `
<input type="checkbox" class ="checkbox">
${item.name}
<button class="delete-button">X</button>
`;
        todoitemList.append(li);
    });

}
