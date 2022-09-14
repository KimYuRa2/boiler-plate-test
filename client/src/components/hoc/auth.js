/*
- 인증 체크 
    HOC(Higher Order Component) 함수 사용하기 : 다른 컴포넌트를 받은 다음, 새로운 컴포넌트를 return하는 function
*/

import {Axios} from "axios";
import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../_actions/user_action"

export default function (SpecificComponent,option, adminRoute = null) { // ex) function(LandingPage, 아무나 출입 가능하므로 true, adminRoute)

    //option 종류
    //null : 아무나 출입이 가능한 페이지
    //true : 로그인한 유저만 출입이 가능한 페이지
    //false : 로그인한 유저는 출입 불가능한 페이지

    //adminRoute : admin user만 들어가기를 원한다면 true , 안쓰면 기본값으로 null이 들어감(ES6)

    function AuthenticationCheck(props){

        const Navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            //Axios.get('/api/users/auth')
            dispatch(auth()) // 페이지가 이동할때마다  distpatch가 작동하여 backend에다가 request를 주는 것임
            .then(response => { // then으로 백엔드에서 처리해서 가져온 모든 정보가 다 들어있음
                console.log(response)

                //로그인 되지 않은 상태
                if(!response.payload.isAuth){ //isAuth가 false이면 (로그인 되지 않은 상태)
                    if(option){ //option이 true인(로그인한 유저만 출입이 가능한) 페이지에 들어가려고 할 때
                        Navigate('/login') //자격이 없으므로 '/login' 페이지로 보내버림
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){ //adminRoute == true인데(admin user만 들어갈 수 있는 페이지) 로그인한 유저가 Admin user가 아니면  
                        Navigate('/')
                    }else{
                        if(option === false){//로그인 한 유저가, 로그인한 유저가 들어갈 수 없는 페이지(ex. LoginPage)에 들어가려고 할 때
                            Navigate('/')
                        }
                    }

                }
            })
        }, [])

        return(
            <SpecificComponent />
        )
    }
    
    return AuthenticationCheck

}