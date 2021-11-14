import React,{createContext,useReducer,useContext} from "react";


export const MyContext = createContext()

export const GlobalState =({reducer,initialState,children})=>{
    return(
        <MyContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </MyContext.Provider>
    )
}

export const StateProvider=()=> useContext(MyContext)



