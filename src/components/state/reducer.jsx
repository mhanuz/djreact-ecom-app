export const initialState={
    profile:null,
    user_image:null,
    user_data:null,
    completecartdata:null,
    upcompletecartdata:null,
    pagereload:null,
}
export const reducer =(state,action)=>{

    switch(action.type){
        case 'add_profile':
            return{
                ...state,
                profile: action.value
            }
        case 'add_image':
            return{
                ...state,
                user_image: action.value
            }
        case 'user_update':
            return{
                ...state,
                user_data: action.value
            }

        case 'add_completecartdata':
        return{
            ...state,
            completecartdata: action.value
        }

        case 'add_uncompletecartdata':
        return{
            ...state,
            upncompletecartdata: action.value
        }
        case 'add_pagereload':
        return{
            ...state,
            pagereload: action.value
        }

        

        default:
            return state
    }
}