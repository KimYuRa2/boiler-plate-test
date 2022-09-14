// 리액트 화면은 app.js에서 페이지가 렌더링되어 나오는 것.(- app의 컴포넌트는 index.js 안에 들어가있음 )
// Routing 관련 일 처리
// import logo from './logo.svg';
import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes, //react-router-dom 버전6 업그레이드 => Switch > Routes
  Route,
  Link
} from "react-router-dom"; // 페이지 이동을 할 때, React Router Dom을 사용함 (npm i react-router-dom --save)

/* components import */
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";

//import Auth from "./hoc/auth"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={ <LandingPage/> }> </Route>
          <Route exact path="/login" element={ <LoginPage/>} />
          <Route exact path="/register" element={ <RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
