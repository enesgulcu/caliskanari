//createSlice: state tanımlaması ve reducer tanımlamasını birlikte yapar.
// PayloadAction: action içindeki payload'u yakalamak için kullanılır.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//1 ###########################################################################
//#############################################################################

// State tanımları
interface CounterState {
  value: number;
}

interface StudentState {
  name: string;
  age: number;
}

//2 ###########################################################################
//#############################################################################

// State tanımlaması
const initialCounterState: CounterState = {
  value: 0,
};

const initialUserState: StudentState = {
  name: '',
  age: 0,
};

//3 ###########################################################################
//#############################################################################

// Counter reducer
export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

// User reducer
export const studentSlice = createSlice({
  name: 'student',
  initialState: initialUserState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
  },
});

//4 ############################################################################
//#############################################################################

// reducer içindeki aksiyonları export ediyoruz.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { setName, setAge } = studentSlice.actions;

export default {
  counterSlice,
  studentSlice,
}

//#############################################################################
//#############################################################################