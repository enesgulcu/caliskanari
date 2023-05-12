"use client"
import React from 'react'

//"useSelector" Slice'lara erişim sağlar ve veriye erişiriz. 
//"useDispatch" Slice > reducers içindeki fonksiyonları çalıştırmamızı sağlar.
import { useSelector, useDispatch } from 'react-redux';

//Slice içindeki reducer fonksiyonlarını (aksiyonları) çağırmak için import ettik.
import { increment, decrement, incrementByAmount, setName, setAge } from '@/redux/stores';

//fonksiyonumuzu kullanmak için çağırdık.(dispatch içinde çalıştırmamız yeterli olacak)
import store from '@/redux/stores'

/* RootState: store içindeki tüm state leri alır -> RootState['counter'] şeklinde direk erişilebilir.   */
import { RootState } from '@/redux/stores';


const Posts:React.FC<any> = ({params}) => {
// ---------------------------------------------------------------------------------------------
    /* ## TERCİH ## 
    VERİ ÇEKME 1. YÖNTEM => 
    State verilerini .getState() ile alırız.*/ 
    const studentData = store.getState().student;
    const counterData = store.getState().counter;
// ---------------------------------------------------------------------------------------------
    /* ## TERCİH ## 
    VERİ YAZMA (FONKSİYON İLE) 2. YÖNTEM =>  
    State verilerini state tanımlandığı yerden .dispatch() ile değiştiririz.*/ 
    const dispatch = useDispatch();
    dispatch(increment()); 
    dispatch(incrementByAmount(5));
    dispatch(decrement());
    dispatch(setName('enes'));
    dispatch(setAge(25));

// ---------------------------------------------------------------------------------------------
    /* ## ALTERNATİF YÖNTEM ##
    VERİ ÇEKME 2. YÖNTEM =>
    State verilerini useSelector ile alırız.*/ 
    const counter = useSelector((state: RootState) => state.counter);
    console.log(counter);
    const student = useSelector((state: RootState) => state.student);
    console.log(student);
// ---------------------------------------------------------------------------------------------
    /* ## ALTERNATİF YÖNTEM ## 
    VERİ YAZMA (FONKSİYON İLE) 1. YÖNTEM =>  
    State verilerini "store" .dispatch() ile değiştiririz.  */    
    dispatch({type: 'counter/increment'});
    dispatch({type: 'student/setName', payload: 'enes'}); // 
    dispatch({type: 'student/setAge', payload: 25}); 
// ---------------------------------------------------------------------------------------------

    return (
        <div>
            
        </div>
    )
}

export default Posts
