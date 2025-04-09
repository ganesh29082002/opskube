import  {createSlice} from '@reduxjs/toolkit'


const auth = createSlice({
    name: 'auth',
    initialState: {
        loginUser:{
            token: null,
            loginUserDetails:{}
        },
        
    },
    reducers: {
        loginUser: (state, action) => {
            console.log(action.payload , "loginUser")
            state.loginUser.token = action.payload.data.token
            state.loginUser.loginUserDetails = action.payload.data.user

        },
        logoutUser: (state, action) => {
            state.loginUser.token = null
            state.loginUser.loginUserDetails = {}
        },
    }

})

export const { loginUser , logoutUser} = auth.actions 

export default auth.reducer