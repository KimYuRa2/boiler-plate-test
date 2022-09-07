import React, {useEffect} from 'react' //useEffect : 리액트 컴포넌트가 "렌더링 될 때마다", "특정 작업을 실행"할 수 있도록 하는 Hook
import axios from 'axios'; // react.js(client)에서 server로 "request를 보낼 때" 사용됨! (client폴더에서 npm i axios --save)

function LandingPage() {
    useEffect(() => {
        /*  axios 실습!!  */
        axios.get('/api/hello')
        .then(response=> console.log(response.data));
    }, []); // [] : LandingPage 컴포넌트가 "리렌더링 될 때마다" useEffect 실행됨
  return (
    <div style={
        {display:'flex', justifyContent: 'center', alignItems:'center',width:'100%',height:'100vh'}
    }>
      시작페이지
    </div>
  )
}

export default LandingPage
