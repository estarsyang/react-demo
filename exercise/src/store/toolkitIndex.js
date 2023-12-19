import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'

// createAsyncThunk, first argument is a type which you give. second argu is a callback
export const getNumThunk = createAsyncThunk('num/getNum', async (params) => {
  console.log('params', params);
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(999)
    })
  })

  return res
})

const msgSlice = createSlice({
  name: 'msgSlice',
  initialState: {
    mes: 'hello'
  },
  reducers: {
    changeMes(state, action) {
      console.log(action);
      state.mes = action.payload
    }
  }
})

const numSlice = createSlice({
  name: 'numSlice',
  initialState: {
    num: 0
  },
  reducers: {
    changeNum(state) {
      state.num += 1
    }
  },
  extraReducers: (builder) => {
    // listen to the pending event of getNumThunk
    builder.addCase(getNumThunk.pending, (state) => {
      // ...
    })
    // listen to the fulfilled event of getNumThunk
    builder.addCase(getNumThunk.fulfilled, (state, { payload }) => {
      state.num = payload
    })
    // ...
  }
})
console.log(msgSlice);

export const { changeMes } = msgSlice.actions
export const { changeNum } = numSlice.actions


const store = configureStore({
  // register reducer. sliceName.reducer
  reducer: {
    msgReducer: msgSlice.reducer,
    numReducer: numSlice.reducer
  }
})

export default store