import { Todo} from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const textInput = document.querySelector(".new-todo");
const eliminarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const selectedFiltros = document.querySelectorAll(".filtro")

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class=" ${ (todo.completado) ? 'completed' : ''} " data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>

        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.appendChild(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos

textInput.addEventListener("keydown", (event) => {

    if ( event.keyCode === 13 && textInput.value.length > 0) {

        const nuevoTodo = new Todo(textInput.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        textInput.value = "";
    };

});

divTodoList.addEventListener("click", (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.dataset.id;
    const className = event.target.parentElement.parentElement.className;

    if (nombreElemento === "input") {

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");

    } else if (nombreElemento.includes("button")){

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }

    console.log(todoList);
});

eliminarCompletados.addEventListener("click", (event) => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains("completed")){
            divTodoList.removeChild(elemento);
        };
    };
});

ulFiltros.addEventListener("click", (event) => {
    const filtros = event.target.text;
    if (!filtros) {return;}

    selectedFiltros.forEach(elemento => elemento.classList.remove("selected"))

    event.target.classList.add("selected")

    if (filtros == "Pendientes") {

        for (let elemento of divTodoList.children){
            if (elemento.classList.contains("completed")) {
                elemento.classList.add("hidden");
            } else {
                elemento.classList.remove("hidden");
            };
        };

    } else if (filtros == "Completados") {

        for (let elemento of divTodoList.children){
            if (elemento.classList.contains("completed")) {
                elemento.classList.remove("hidden");
            } else {
                elemento.classList.add("hidden");
            };
        };
        

    } else {

        for (let elemento of divTodoList.children){
            elemento.classList.remove("hidden");
        };

    };

    // Esta mas que claro que se puede hacer de una forma mil veces menos complicada.


});

