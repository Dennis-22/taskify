import {_tasks} from '../../utils/constance'

// const tasks = [
//     {id:'1', title:"React app", description:"this is a task description", tag:"family", date:{start:"now", end:"later"}},
//     {id:'2', title:"Veu app", description:"this is a task description", tag:"work", date:{start:"now", end:"later"}},
//     {id:'3', title:"Angular", description:"this is a task description", tag:"personal", date:{start:"now", end:"later"}},
//     {id:'4', title:"Svelt", description:"this is a task description", tag:"work", date:{start:"now", end:"later"}},
// ]

const state = {
    data:[],
    tasks:[],
    fetched:false, //has the tasks been fetch from the backend
}

function taskReducer(state, action){
    const {type, payload} = action
    switch(type){
        case(_tasks.GET_TASKS):
            return {...state, data:payload, tasks:payload, fetched:true}
        case(_tasks.ADD_TASK):{
            let newTasks = [...state.data, payload]
            return {...state, data:newTasks, tasks:newTasks}
        }
        case(_tasks.SEARCH):{
            let results = state.data.filter(task => task.title.toLowerCase().includes(payload.toLocaleLowerCase()))
            return {...state, tasks:results}
        }
        case(_tasks.EDIT_TASK):{
            let newTasks = state.tasks.map((task) => {
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