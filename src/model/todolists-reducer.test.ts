import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer
} from './todolists-reducer'
import {TodolistType} from "../App";
import {v1} from "uuid";

let todoListId1: string;
let todoListId2: string;
let startState: TodolistType[] = []

beforeEach(()=> {
	todoListId1 = v1()
	todoListId2 = v1()

	startState = [
		{id: todoListId1, title: 'What to learn', filter: 'all'},
		{id: todoListId2, title: 'What to buy', filter: 'all'},
	]
})

test('correct todolist should be removed', () => {
	const endState = todoListsReducer(startState, removeTodoListAC({id: todoListId1}))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todoListId2)
})
test('correct todolist should be added', () => {
	const newTitle = 'New Todolist'

	const endState = todoListsReducer(startState, addTodoListAC({title: newTitle}))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTitle)
})
test('correct todolist should change its name', () => {
	const newTitle = 'New Todolist'

	const endState = todoListsReducer(startState, changeTodoListTitleAC({id: todoListId2, title: newTitle}))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTitle)
})
test('correct filter of todolist should be changed', () => {

	const newFilter = 'completed'

	const endState = todoListsReducer(startState, changeTodoListFilterAC({id: todoListId2, filter: newFilter}))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

