import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
	switch (action.type) {
		case REMOVE_TODOLIST: {
			return state.filter(tl => tl.id !== action.payload.id)
		}

		case ADD_TODOLIST: {
			const todolistId = v1()
			const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
			return [...state, newTodolist]
		}

		case CHANGE_TODOLIST_TITLE: {
			return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
		}

		case CHANGE_TODOLIST_FILTER: {
			return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
		}

		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const removeTodolistAC = (todolistId: string)=> {
	return {type: REMOVE_TODOLIST, payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string) => {
	return {type: ADD_TODOLIST, payload: {title}} as const
};

export const changeTodolistTitleAC = (id: string, title: string) => {
	return {type: CHANGE_TODOLIST_TITLE, payload: {id, title}} as const
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
	return {type: CHANGE_TODOLIST_FILTER, payload: {id, filter}} as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType =  ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType =  ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

