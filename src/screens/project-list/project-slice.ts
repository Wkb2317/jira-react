import { createSlice } from '@reduxjs/toolkit'

interface IInitState {
  projectModelStatus: boolean
}

const initialState: IInitState = {
  projectModelStatus: false
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openProjectModel(state) {
      state.projectModelStatus = true
    },
    closeProjectModel(state) {
      state.projectModelStatus = false
    }
  }
})

// 导出reducer函数
export const { openProjectModel, closeProjectModel } = projectSlice.actions

// 这里需要导出reducer
export default projectSlice.reducer
