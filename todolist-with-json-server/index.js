//console.log("hello world")

/* 
  client side
    template: static template
    logic(js): MVC(model, view, controller): used to server side technology, single page application
        model: prepare/manage data,
        view: manage view(DOM),
        controller: business logic, event bindind/handling

  server side
    json-server
    CRUD: create(post), read(get), update(put, patch), delete(delete)


*/

const APIs = (() => {
    const URL = "http://localhost:3000/";
    const pendingTodos_URL = URL + "pendingTodos";
    const completedTodos_URL = URL + "completedTodos";
    const createPendingTodo = (newTodo) => {
        return fetch(pendingTodos_URL, {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    };

    const createCompletedTodo = (newTodo) => {
        return fetch(completedTodos_URL, {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    };

    const deletePendingTodo = (id) => {
        return fetch(pendingTodos_URL + "/" + id, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const deleteCompletedTodo = (id) => {
        return fetch(completedTodos_URL + "/"+ id, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const getPendingTodos = () => {
        return fetch(pendingTodos_URL).then((res) => res.json());
    };

    const getCompletedTodos = () => {
        return fetch(completedTodos_URL).then((res) => res.json());
    };

    const updatePendingTodo = (id, content) => {
        return fetch(pendingTodos_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        }).then((response) => response.json()).then(data => JSON.stringify(data));
    };

    const updateCompletedTodo = (id, content) => {
        return fetch(completedTodos_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        }).then((response) => response.json());
    };
    return { createPendingTodo, createCompletedTodo, deletePendingTodo, deleteCompletedTodo, getPendingTodos, 
             getCompletedTodos, updatePendingTodo, updateCompletedTodo };
})();

//IIFE
//todos
/* 
    hashMap: faster to search
    array: easier to iterate, has order


*/
const Model = (() => {
    class State {
        #pendingTodos; //private field
        #completedTodos;
        #onChange; //function, will be called when setter function todos is called
        constructor() {
            this.#pendingTodos = [];
            this.#completedTodos = [];
        }
        get pendingTodos() {
            return this.#pendingTodos;
        }
        get completedTodos() {
            return this.#completedTodos;
        }
        set pendingTodos(newTodos) {
            // reassign value
            this.#pendingTodos = newTodos;
            this.#onChange(); // rendering
        }
        set completedTodos(newTodos) {
            // reassign value
            this.#completedTodos = newTodos;
            this.#onChange(); // rendering
        }

        subscribe(callback) {
            //subscribe to the change of the state todos
            this.#onChange = callback;
        }
    }
    const { createPendingTodo, createCompletedTodo, deletePendingTodo, deleteCompletedTodo, getPendingTodos, getCompletedTodos,
            updatePendingTodo, updateCompletedTodo } = APIs;
    return {
        State,
        createPendingTodo, 
        createCompletedTodo, 
        deletePendingTodo, 
        deleteCompletedTodo, 
        getPendingTodos, 
        getCompletedTodos,
        updatePendingTodo, 
        updateCompletedTodo
    };
})();

const View = (() => {
    const todolistEl = document.querySelector(".pending-task");
    const donelistEl = document.querySelector(".completed-task");
    const submitBtnEl = document.querySelector(".submit-btn");
    const inputEl = document.querySelector(".input");
    const deleteBtnEl = document.querySelector(".delete-btn");
    const editBtnEl = document.querySelector(".edit-btn");
    const toCompleteBtnEl = document.querySelector(".toComplete-btn");
    const toPendingBtnEl = document.querySelector(".toPending-btn");
    const getInputValue = () => inputEl.value;

    const renderTodos = (pendingTodos, completedTodos) => {
        let pendingTodosTemplate = "";
        let completedTodosTemplate = "";
        pendingTodos.forEach((todo) => {
            const liTemplate = `<li todo-id = "${todo.id}"><span>${todo.content}</span><button class="edit-btn">edit</button>
            <button class="delete-btn" id="${todo.id}">delete</button><button class="toComplete-btn">complete</button></li>`;
            pendingTodosTemplate += liTemplate;
        });
        if (pendingTodos.length === 0) {
            pendingTodosTemplate = "<h4>no pending tasks!</h4>";
        }
        completedTodos.forEach((todo) => {
            const liTemplate = `<li todo-id = "${todo.id}"><button class="toPending-btn">pend</button><span>${todo.content}
            </span><button class="edit-btn">edit</button><button class="delete-btn" id="${todo.id}">delete</button></li>`;
            completedTodosTemplate += liTemplate;
        })
        if (completedTodos.length === 0){
            completedTodosTemplate = "<h4>no completed tasks!</h4>";
        }
        todolistEl.innerHTML = pendingTodosTemplate;
        donelistEl.innerHTML = completedTodosTemplate;
    };

    const clearInput = () => {
        inputEl.value = "";
    };

    return { renderTodos, submitBtnEl, inputEl, clearInput, todolistEl, donelistEl, getInputValue, deleteBtnEl, editBtnEl,
    toCompleteBtnEl, toPendingBtnEl };
})();

const Controller = ((view, model) => {
    const state = new model.State();
    const init = () => {
        model.getPendingTodos().then((pendingTodos) => {
            pendingTodos.reverse();
            state.pendingTodos = pendingTodos;
        });
        model.getCompletedTodos().then((completedTodos) => {
            completedTodos.reverse();
            state.completedTodos = completedTodos;
        });
    };

    const handleSubmit = () => {
        view.submitBtnEl.addEventListener("click", (event) => {
            const inputValue = view.inputEl.value;
            model.createPendingTodo({ content: inputValue }).then((data) => {
                state.pendingTodos = [data, ...state.pendingTodos];
                view.clearInput();
            });
        });
    };

    const handleCompletedDelete = () => {
        view.donelistEl.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = event.target.id;
                model.deleteCompletedTodo(+id).then((data) => {
                    state.completedTodos = state.completedTodos.filter((todo) => todo.id !== +id);
                });
            }
        });
    };

    const handlePendingDelete = () => {
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = event.target.id;
                model.deletePendingTodo(+id).then((data) => {
                    state.pendingTodos = state.pendingTodos.filter((todo) => todo.id !== +id);
                });
            }
        });
    };

    const handleToComplete = () => {
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "toComplete-btn") {
                const id = event.target.parentNode.getAttribute("todo-id");
                const content = event.target.parentNode.querySelector("span").textContent;
                model.createCompletedTodo({content}).then((data) => {
                    state.completedTodos = [data, ...state.completedTodos];
                })
                model.deletePendingTodo(+id).then((data) => {
                    state.pendingTodos = state.pendingTodos.filter((todo) => todo.id !== +id);
                })
            }
        });
    }

    const handleToPend = () => {
        view.donelistEl.addEventListener("click", (event) => {
            if (event.target.className === "toPending-btn") {
                const id = event.target.parentNode.getAttribute("todo-id");
                const content = event.target.parentNode.querySelector("span").textContent;
                model.createPendingTodo({content}).then((data) => {
                    state.pendingTodos = [data, ...state.pendingTodos];
                })
                model.deleteCompletedTodo(+id).then((data) => {
                    state.completedTodos = state.completedTodos.filter((todo) => todo.id !== +id);
                })
            }
        });
    }

    const handlePendingEdit = () => {
        view.todolistEl.addEventListener("click", (event) => {
            if (event.target.className === "edit-btn") {
                    const liEl = event.target.closest("li");
                    const spanEl = liEl.querySelector("span");
                    const editBtn = liEl.querySelector(".edit-btn");
        
                if (spanEl.contentEditable !== "true") {
                    spanEl.contentEditable = "true";
                    spanEl.focus();
                    editBtn.textContent = "Save";
                } 
                else {
                    const id = liEl.getAttribute("todo-id");
                    const newContent = spanEl.textContent;
                    model.updatePendingTodo(+id, { content: newContent }).then((data) => {
                        const index = state.pendingTodos.findIndex((todo) => todo.id === data.id);
                        if (index !== -1) {
                            state.pendingTodos[index] = data;
                        }
                    });
                    spanEl.contentEditable = "false";
                    editBtn.textContent = "Edit";
                }
            }
        });
      };

      const handleCompletedEdit = () => {
        view.donelistEl.addEventListener("click", (event) => {
            if (event.target.className === "edit-btn") {
                    const liEl = event.target.closest("li");
                    const spanEl = liEl.querySelector("span");
                    const editBtn = liEl.querySelector(".edit-btn");
        
                if (spanEl.contentEditable !== "true") {
                    spanEl.contentEditable = "true";
                    spanEl.focus();
                    editBtn.textContent = "Save";
                } 
                else {
                    const id = liEl.getAttribute("todo-id");
                    const newContent = spanEl.textContent;
                    model.updateCompletedTodo(+id, { content: newContent }).then((data) => {
                        const index = state.pendingTodos.findIndex((todo) => todo.id === data.id);
                        if (index !== -1) {
                            state.pendingTodos[index] = data;
                        }
                    });
                    spanEl.contentEditable = "false";
                    editBtn.textContent = "Edit";
                }
            }
        });
      };
      

    const bootstrap = () => {
        handleSubmit();
        init();
        handleCompletedDelete();
        handlePendingDelete();
        handleToComplete();
        handleToPend();
        handlePendingEdit();
        handleCompletedEdit();
        state.subscribe(() => {
            view.renderTodos(state.pendingTodos, state.completedTodos);
        });
    };
    return {
        bootstrap,
    };
})(View, Model); //ViewModel

Controller.bootstrap();
