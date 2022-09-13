import axios from 'axios';
import {
    LOGIN_USER
}from './types';
/*
    LoginPage.js에서 준 body정보{ (dispatch(loginUser(body))) === loginPage에서 입력한 email과 password }를
    dataToSubmit 파라미터를 통해 받음
*/
export function loginUser(dataToSubmit){ //dataToSubmit에는 loginPage에서 입력한 email과 password가 들어있음
    //원래는 LoginPage.js의 onSubmitHandler에서 하던 request를 여기서 하도록 가져옴!
    //server>index.js의 /api/users/login으로 이동(request를 날림)
    const request = axios.post('/api/users/login', dataToSubmit)
        .then( response => response.data ) //server에서 받아온 data를 "request"에다가 저장함

    return{ //reducer로 보내줘야함. reducer에서 이전의 state와 현재의 action을 조합해서 다음state를 만들어줘야 하기 때문
        type: LOGIN_USER,
        payload : request
    }
}