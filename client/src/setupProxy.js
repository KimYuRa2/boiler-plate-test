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