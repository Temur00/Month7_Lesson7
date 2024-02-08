// Define actions
const ADD_TODO = "ADD_TODO";

// Define action creators
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

// Define reducer
function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
}

// Create store
const store = Redux.createStore(todoReducer);

// Subscribe to store changes
store.subscribe(() => {
  const todos = store.getState();
  renderTodos(todos);
});

// Render todos
function renderTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const span = document.createElement("span");
    span.textContent = todo;
    todoList.appendChild(span);
  });
}
