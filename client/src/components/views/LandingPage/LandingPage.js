import React, {useEffect} from 'react' //useEffect : 리액트 컴포넌트가 "렌더링 될 때마다", "특정 작업을 실행"할 수 있도록 하는 Hook
import axios from 'axios'; // react.js(client)에서 server로 "request를 보낼 때" 사용됨! (client폴더에서 npm i axios --save)
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';


function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
        /*  axios 실습!!  */
        axios.get('/api/hello')
        .then(response=> console.log(response.data));
  }, []); // [] : LandingPage 컴포넌트가 "리렌더링 될 때마다" useEffect 실행됨

  const onClickHandler = (props) => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success){
        navigate('/login') //로그아웃 성공시 로그인페이지로 이동
      }else{
        alert('로그아웃 하는 데 실패했습니다')
      }
    })
  }

  return (
    <div style={
        {display:'flex', justifyContent: 'center', alignItems:'center',width:'100%',height:'100vh'}
    }>
      시작페이지
      <button onClick={ onClickHandler }>로그아웃</button>  
    </div>
  )
}

export default Auth(LandingPage, null)
