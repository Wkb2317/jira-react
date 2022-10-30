import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from './index'
import { User } from '../screens/project-list/type'
import { AuthForm, bootstrapUser } from '../context/auth-context'
import { loginApi, registerApi } from '../auth-provider'
import { useSelector } from 'react-redux'

interface IInitState {
  user: User | null
}

const initialState: IInitState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, actions) {
      state.user = actions.payload
    },
    register(state, actions) {
      state.user = actions.payload
    },
    logout(state, actions) {
      state.user = actions.payload
    },
    bootstrap(state, actions) {
      state.user = actions.payload
    }
  }
})

const userReducer = userSlice.reducer
const { login, register, logout, bootstrap } = userSlice.actions

const loginThunk = (form: AuthForm) => (dispatch: AppDispatch) =>
  loginApi(form).then((user) => dispatch(login(user)))

const registerThunk = (form: AuthForm) => (dispatch: AppDispatch) =>
  registerApi(form).then((user) => dispatch(register(user)))

const logoutThunk = () => (dispatch: AppDispatch) => dispatch(logout(null))

const bootstrapUserThunk = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(bootstrap(user)))

export {
  userReducer,
  loginThunk,
  registerThunk,
  logoutThunk,
  bootstrapUserThunk
}
