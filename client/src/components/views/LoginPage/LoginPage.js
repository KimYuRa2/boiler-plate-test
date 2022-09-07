import React,{useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import user_reducer from '../../../_reducers/user_reducer';
import {Navigate, useNavigate} from 'react-router-dom'; // useNavigate로 페이지 이동 => react-router-dom v6업데이트로 history로 페이지이동 시 오류가 났었음! 

function LoginPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("") // useState(initialState:처음상태 설정)
  const [Password, setPassword] = useState("") //react hooks의 기능 : 서버에 보내려 하는 값들을 state에서 갖고있음

  const onEmailHandler = (event) => { 
    setEmail(event.currentTarget.value) // setEmail로 state 바꿔주기 (현재 타겟의 value를 바꿈)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); // 누를 때마다 페이지 refresh되는 것을 방지. refresh가 돼버리면 이 밑에서 수행해야 할 것들을 수행할 수 없음
    console.log('Email:' , Email);
    console.log('Password : ', Password);
    let body = {
      email : Email,
      password : Password
    }
    dispatch(loginUser(body)) //dispatch를 사용해서 loginUser라는 action을 취함(user_action.js)
    .then(response => {
      if( response.payload.loginSuccess ){ // login성공하면, main(root)페이지로 
        Navigate('/');
      }else{
        alert('ERROR!')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',
      width:'100%',height:'100vh' }}
    >
      <form style={{ display:'flex', flexDirection:'column'}} onSubmit={ onSubmitHandler }>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/> 
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginPage
