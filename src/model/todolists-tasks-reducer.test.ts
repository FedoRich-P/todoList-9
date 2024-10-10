import {TasksStateType, TodolistType} from "../App";
import {addTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodoListAC({title: 'new todolist'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodoLists).toBe(action.payload.id)
})