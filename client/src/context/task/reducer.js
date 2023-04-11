import {_tasks} from '../../utils/constance'

const state = {
    data:[
        {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
    ],
    tasks:[
        {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
        // {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
        // {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
        // {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
        // {id:'1', title:"Create a web app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
    ]
}

function taskReducer(state, action){
    const {type, payload} = action
    switch(type){
        case(_tasks.GET_TASKS):
            return {...state, data:payload, tasks:payload}
        case(_tasks.ADD_TASK):{
            let newTasks = [...state.data, payload]
            console.log(newTasks)
            return {...state, data:newTasks, tasks:newTasks}
        }
        case(_tasks.EDIT_TASK):{
            let newTasks = state.task.map((task) => {
                if(task.id === payload.id){
                    return {...task, ...payload.data}
                }
                return task
            })
            return {...state, data:newTasks, tasks:newTasks}
        }
        case(_tasks.DELETE_TASK):{
            let newTasks = state.data.filter(task => task.id !== payload)
            return {...state, data:newTasks, tasks:newTasks}
        }
    }
    return state
}

export {taskReducer, state}