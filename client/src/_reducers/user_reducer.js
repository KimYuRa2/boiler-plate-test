import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function( state={}, action ){ // (이전state, action) , state는 빈 상태
    switch( action.type ){ //다른 type이 올 때마다 다르게 처리해줘야 하기 때문에 switch문법 사용
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...(spread연산자 : state를 똑같이 가져오는 역할), loginSuccess: action.payload(user_actions.js에서 받은 payload를 loginSuccess에 넣어줌)
            break;

        case REGISTER_USER:
            return {...state, register : action.payload } //register: action.payload => 서버에서 가져온 response를 action.payload를 이용해서 register에 넣어줌
            break;

        case AUTH_USER:
            return {...state, userData : action.payload } //userData : action.payload=>서버에서 가져온 response(index.js의 '/api/users/auth'부분에서 받아온 모든 user data)를 action.payload를 통해 userData에 넣어줌
            break;
            
        default :
            return state;
    }

}