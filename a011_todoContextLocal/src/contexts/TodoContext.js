import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todod: [
        {
            id: 1,
            todo: "Todo mag",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider