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

var editTodoModal = new bootstrap.Modal(
  document.getElementById("editTodoModal"),
  { keyboard: false }
);

function openAddModal() {
  var myModal = new bootstrap.Modal(document.getElementById("addTodoModal"));
  myModal.show();
}

function openEditModal(button) {
  var row = button.closest("tr");
  var task = row.cells[1].textContent;
  var editInput = document.getElementById("editTodoInput");
  editInput.value = task;
  editTodoModal.show();
}

function saveEditedTodo() {
  var editInput = document.getElementById("editTodoInput");
  var newValue = editInput.value.trim();
  if (newValue !== "") {
    var row = document.querySelector("#todoList tr.selected");
    row.cells[1].textContent = newValue;
    editTodoModal.hide();
  }
}

function searchTodos() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("todoList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function deleteTodo(button) {
  var confirmation = confirm("Are you sure you want to delete this task?");
  if (confirmation) {
    var row = button.closest("tr");
    row.remove();
  }
}

function toggleTaskStatus(checkbox) {
  var row = checkbox.closest("tr");
  var taskCell = row.querySelector(".task");
  if (checkbox.checked) {
    taskCell.classList.add("completed");
  } else {
    taskCell.classList.remove("completed");
  }
}

function openModal() {
  var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  myModal.show();
}
