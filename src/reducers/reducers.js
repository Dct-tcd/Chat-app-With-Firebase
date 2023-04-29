
const initState = {
    username:"",
}

 const reducer = (state = initState,action)=>{
    if(action.type=="username_change"){
         return {
             ...state,
             username:action.payload
         }
    }
    return state
}

export default reducer