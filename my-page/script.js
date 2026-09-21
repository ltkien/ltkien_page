const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

function addTodo() {
    const text = todoInput.value.trim();

    if (text === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("todo-item");

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.classList.add("delete-btn");

    // Click công việc → hoàn thành
    span.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Click Xóa
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value = "";
    todoInput.focus();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});