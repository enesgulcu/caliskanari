import { configureStore} from '@reduxjs/toolkit';

//studentSilce içindeki stateleri dahil ettik
import {counterSlice, studentSlice} from './studentStore';

// Store oluşturma ve tanımlama (buradaki tanımlara göre dışarıdan çağrılacak)
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    student: studentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
/*component içerisinde ki örnek kullanım:
###-> const counter = useSelector((state: RootState) => state.counter); // counter state'e erişim */

export type AppDispatch = typeof store.dispatch;
/*const dispatch = useDispatch<AppDispatch>();
dispatch(counterSlice.actions.increment()); // counter state'i için increment action dispatch etme
*/

export default store;