import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'; // Antd CSS Framework 사용

/* redux 설정 */
import {Provider} from 'react-redux';
import {applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import promiseMiddleware from 'redux-promise'; // promise 형태의 action을 처리하도록 돕는 redux 미들웨어
import ReduxThunk from 'redux-thunk'; // function 형태의 action을 처리하도록 돕는 redux 미들웨어
import Reducer from './_reducers';

//promiseMiddleware,ReduxThunk를 적용할 수 있도록 createStoreWithMiddlewarestore을 만들어주기
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  //Provider : redux와 나의 app을 연결시켜줌
  <Provider
    store = { createStoreWithMiddleware( reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
)


// const root = ReactDOM.createRoot(document.getElementById('root')); //public > index.html에서 <div id="root"></div>라는 element를 id로 잡은 다음, index.html에다가 보여줄 것을 <App /> 라고 정의해주는 것.
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
