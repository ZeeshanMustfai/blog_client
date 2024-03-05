import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/auth-service'
import { PropLogin } from '@components/Login'

export const signup = createAsyncThunk(
  'auth/register',
  async (user: PropLogin, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error: any) {
      let errorList = error?.response?.data?.errors
      let message = ''

      if (errorList?.email) {
        message = errorList.email
      }
      if (errorList?.password) {
        message = errorList?.password
      }

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout()
})

export const login = createAsyncThunk(
  'auth/login',
  async (user: PropLogin, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error: any) {
      let errorList = error?.response?.data?.errors
      let message = ''

      if (errorList?.email) {
        message = errorList.email
      }
      if (errorList?.password) {
        message = errorList?.password
      }

      return thunkAPI.rejectWithValue(message)
    }
  }
)

const getItem = localStorage.getItem('user') as string
const user = JSON.parse(getItem)

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isLoading = false),
        (state.isError = false),
        (state.message = ''),
        (state.isSuccess = false)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false
      state.user = null
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.user = null
      state.isError = true
      state.message = action.payload as string
    })
  },
})
export const { reset } = authSlice.actions
export default authSlice.reducer
