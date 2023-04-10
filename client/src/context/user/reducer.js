import {_user} from '../../utils/constance'

const state = {
    user:{},
    signedIn:false
}

function userReducer(state, action){
    const {type, payload} = action
    switch(type){
        case(_user.SIGN):
            return {...state, user:payload, signedIn:true}
        case(_user.LOG_OUT):{
            return {...state, user:{}, signedIn:false}
        }
    }
    return state
}

export {userReducer, state}