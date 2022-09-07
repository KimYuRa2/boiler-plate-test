/*
    - proxy server 사용 이유!
        1) 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
        2) 캐시를 이용하여 더 빠른 인터넷 이용 제공
        3) 더 나은 보안 제공
        4) 이용 제한된 사이트 접근 가능
*/

// CORS 정책으로 (보안상) 클라이언트서버(3000)+ 서버(7000) 두 개의 다른포트를 가지고 있는 서버는 아무런 설정 없이 request를 보낼 수 없다
// Proxy 설정하기 (client > npm i http-proxy-middleware --save 필요)
// Cors 이슈 해결 :  client => server 로 request를 보낼 수 있게 됨!

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://localhost:7000',
            changeOrigin : true
        })
    )
}