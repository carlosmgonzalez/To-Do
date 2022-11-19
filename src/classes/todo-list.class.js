import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        this.cargarLocalStorage();
    };

    nuevoTodo(tarea) {
        this.todos.push(tarea);
        this.guardarLocalStorage();
        this.cargarLocalStorage();
    };

    eliminarTodo(id) {
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
        this.cargarLocalStorage();
    };

    marcarCompletado(id) {

        for (const todo of this.todos) {

            if (todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.cargarLocalStorage();
                break;
            };
        };
    };

    elimicarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado)
    };

    guardarLocalStorage(){
        localStorage.setItem("todo", JSON.stringify(this.todos));
    };

    cargarLocalStorage(){
        
        let datos = localStorage.getItem("todo")
        this.todos = datos ? JSON.parse(datos) : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj) )
    };
};

