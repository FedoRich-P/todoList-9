import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

let startState: TasksStateType = {};

beforeEach(() => {
     startState = {
        todoListId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todoListId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({todoListId: 'todoListId2', taskId: '2'}))
    expect(endState).toEqual({
        todoListId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todoListId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})
test('correct task should be added to correct array', () => {

    const taskId = v1();
    const taskTitle = 'juce';

    const endState = tasksReducer(startState, addTaskAC({todoListId: 'todoListId2', taskId, title: taskTitle}))

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].id).toBe(taskId)
    expect(endState['todoListId2'][0].title).toBe(taskTitle)
    expect(endState['todoListId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            taskId: '2',
            isDone: false,
            todoListId: 'todoListId2',
        })
    )

    expect(endState['todoListId2'][1].isDone).toBe(false)
    expect(endState['todoListId2'][2].isDone).toBe(false)
})
test('title of specified task should be changed', () => {

    const newTitle = 'new title'
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            taskId: '2',
            title: newTitle,
            todoListId: 'todoListId2',
        })
    )

    expect(endState['todoListId2'][1].title).toBe(newTitle)
    expect(endState['todoListId2'][2].title).toBe('tea')
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodoListAC({title: 'new todolist'}))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodoListAC({id: 'todoListId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
    expect(endState['todoListId2']).toBeUndefined()
})