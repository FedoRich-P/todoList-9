import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

let todolistId1 = v1()
let todoListId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
]


export const todoListsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            const {id} = action.payload
            return state.filter(tl => tl.id !== id)
        }

        case ADD_TODOLIST: {
            const {id, title} = action.payload
            const newTodolist: TodolistType = {id, title, filter: 'all'}
            return [...state, newTodolist]
        }

        case CHANGE_TODOLIST_TITLE: {
            const {id, title} = action.payload
            return state.map(tl => tl.id === id ? {...tl, title} : tl)
        }

        case CHANGE_TODOLIST_FILTER: {
            const {id, filter} = action.payload
            return state.map(tl => tl.id === id ? {...tl, filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodoListAC = (payload: {id: string}) => {
    return {type: REMOVE_TODOLIST, payload} as const
}

export const addTodoListAC = (payload: {title: string}) => {
    return {type: ADD_TODOLIST, payload:{...payload, id: v1()}} as const
};

export const changeTodoListTitleAC = (payload: {id: string, title: string}) => {
    return {type: CHANGE_TODOLIST_TITLE, payload} as const
};

export const changeTodoListFilterAC = (payload: {id: string, filter: FilterValuesType}) => {
    return {type: CHANGE_TODOLIST_FILTER, payload} as const
}

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>

export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>

export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>

type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

