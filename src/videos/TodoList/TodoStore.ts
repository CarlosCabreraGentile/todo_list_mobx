import { action, computed, makeObservable, observable } from "mobx";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export class TodoStoreImpl {

    todos: TodoItem[] = [];

    //the variables are observables nd to update that observables you need actions
    //the action in anything that mutates the state
    //computed value does not change the store but gives more information the store
    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            toggleTodo: action,
            status: computed
        });
    }

    addTodo(title: string) {
        const item: TodoItem = {
            id: +Math.random().toFixed(4),
            title,
            completed: false
        };
        //with mobx you are allowed to mutate the state
        this.todos.push(item);
    }

    toggleTodo(id: number) {
        const index = this.todos.findIndex(item => item.id === id);
        if (index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
        }
    }

    get status() {
        let completed = 0, remaining = 0;
        this.todos.forEach(todo => {
            if (todo.completed) {
                completed++;
            }
            else {
                remaining++;
            }
        });
        return { completed, remaining }
    }
}

export const TodoStore = new TodoStoreImpl();