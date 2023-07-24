import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const cityinfo = ({
  name: String,
  code: String,
  temp: String,
});

const initialState = {
  myArray: cityinfo,
}

// myArray.push('string1');
// myArray.splice(0, 1); // This will remove the first element of the array.


export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.myArray.push(action.payload);
      // storage.removeItem('persist:root')
      // state = undefined;
    },
    decrement: (state, action) => {
      // console.log("This is ID: " + action.payload);
      state.myArray.splice(action.payload, 1);
    },
    modify: (state, action) => {
      state.myArray[action.payload.id].code = action.payload.code;
      state.myArray[action.payload.id].temp = action.payload.temp;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, modify } = citySlice.actions

export default citySlice.reducer