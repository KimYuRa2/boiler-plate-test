/* 회원가입 페이지 */
import React,{useState} from 'react'
//import axios from 'axios' // redux 이용으로 request를 보내기 때문에  axios필요 없음!!
/*
axios는 ajax 통신을 위한 라이브러리.
서버로 api를 실행시키기 위한 url 요청을 보내거나,
요청값을 받아와 JSON 형태로 사용할 수 있게 변환해주는 역할을 한다.
보통 데이터를 JSON 형태로 받아와 state값에 저장한 뒤, 데이터를 불러와 화면을 렌더링하는 경우가 대부분인데 이때 가장 대중적으로 사용하는 라이브러리가 바로 axios이다.
*/
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import user_reducer  from '../../../_reducers/user_reducer';
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState(""); // 서버에 보내려 하는 값들을 state에서 갖고있음
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //누를 때마다 페이지 refresh되는 것을 방지
    
    //비밀번호 확인
    if( Password !== ConfirmPassword ){
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
    }
    let body = {
      email : Email,
      password : Password,
      name : Name
    }
    dispatch(registerUser(body)) //registerUser은 user_action에 만듦
    .then(response => {
      if(response.payload.success){
        navigate('/login'); //회원가입 성공 시 login페이지로 이동
      }else{
        alert("회원가입에 실패했습니다.")
      }
    })
  }

  return (
    <div style={ {display: 'flex', justifyContent : 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection:'column'}} onSubmit={ onSubmitHandler }>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button type="submit">
          회원 가입
        </button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false)
