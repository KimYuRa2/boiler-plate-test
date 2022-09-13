import {
    LOGIN_USER
} from '../_actions/types';

export default function( state={}, action ){ // (이전state, action) , state는 빈 상태
    switch( action.type ){ //다른 type이 올 때마다 다르게 처리해줘야 하기 때문에 switch문법 사용
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...(spread연산자 : state를 똑같이 가져오는 역할), loginSuccess: action.payload(user_actions.js에서 받은 payload를 loginSuccess에 넣어줌)
            break;
        default :
            return state;
    }

}