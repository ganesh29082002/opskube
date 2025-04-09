import  {createSlice} from '@reduxjs/toolkit'


const userManagment = createSlice({
    name: 'userManagment',
    initialState: {
        userList:[],
        loginUser : null
    },
    reducers: {
        addUser: (state, action) => {
            console.log(action.payload , "addUser")
            state.userList.push(action.payload.data)
        },

        fetchUserList: (state, action) => { 
            console.log(action.payload , "fetchUserList")
            state.userList = action.payload
        },

        fetchLogInUser: (state, action) => {
            console.log(action.payload , "fetchLogInUser")
            state.loginUser = action.payload
        }

        ,
        updateUserProfile: (state, action) => { 
            console.log(action.payload , "updateUserProfile")
            state.loginUser = action.payload

        }
        
       
    }
})

export const { addUser , fetchUserList , fetchLogInUser} = userManagment.actions 

export default userManagment.reducer