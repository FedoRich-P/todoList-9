import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {v1} from "uuid";

const startState: TasksStateType = {
    todolistId1: [
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false},
    ],
    todolistId2: [
        {id: '1', title: 'bread', isDone: false},
        {id: '2', title: 'milk', isDone: true},
        {id: '3', title: 'tea', isDone: false},
    ],
}

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({todoListId: 'todolistId2', taskId: '2'}))
    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})
test('correct task should be added to correct array', () => {

    const taskId = v1();
    const taskTitle = 'juce';


    const endState = tasksReducer(startState, addTaskAC({todoListId: 'todolistId2', taskId, title: taskTitle}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].id).toBe(taskId)
    expect(endState['todolistId2'][0].title).toBe(taskTitle)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            taskId: '2',
            isDone: false,
            todoListId: 'todolistId2',
        })
    )

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'][2].isDone).toBe(false)
})