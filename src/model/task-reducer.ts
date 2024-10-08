import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            const {todoListId, taskId} = action.payload
            return {
                ...state,
                [todoListId]: state[todoListId].filter(el => el.id !== taskId)
            }
        }
        case ADD_TASK: {
            const {todoListId, taskId, title} = action.payload
            return {
                ...state,
                [todoListId]: [{id: taskId, title, isDone: false},...state[todoListId]]
            }
        }
        case CHANGE_TASK_STATUS: {
            const {todoListId, taskId, isDone} = action.payload
            return {
                ...state,
                [todoListId]: state[todoListId].map(el=> el.id === taskId ? {...el, isDone} : el)
            }
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { todoListId: string, taskId: string }) => {
    return {type: REMOVE_TASK, payload} as const
}

export const addTaskAC = (payload: {todoListId: string, taskId: string, title: string}) => {
    return {type: ADD_TASK, payload} as const
}

export const changeTaskStatusAC = (payload: {todoListId: string, taskId: string, isDone: boolean}) => {
    return {type: CHANGE_TASK_STATUS, payload} as const
}


// Actions types
export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type AddTaskType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>


type ActionsType = RemoveTaskType | AddTaskType | ChangeTaskStatusType


