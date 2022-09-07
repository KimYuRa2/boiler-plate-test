// index.js > app.get ('api/users/auth', auth , (req, res)=> 에서 사용되는 미들웨어 만들기
const {User1} = require("../models/User1")

let auth = (req, res, next) => {
    //인증처리를 하는 곳 => user가 있으면 인증 O / user가 없으면 인증 X

    //client 쿠키에서 token을 가져옴
    let token = req.cookies.x_auth;

    //token 복호화(decode) 후 user을 찾는다
    User1.findByToken(token, (err, user) => { // 여기서 token : 클라이언트 쿠키에서 가져온 token( req.cookies.x_auth)
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, err: true}) //user가 없으니ㅣ auth:false, error가 있다고 전해줌
        req.token = token; //user가 있음 ! => 클라이언트 쿠키에서 가져온 token( req.cookies.x_auth)을 req.token에 저장
        req.user = user; // token과 user을 req에 넣어줌으로 인해서 index.js> app.get('api/users/auth', auth , (req, res)=> { ... 안에서 > req.~~로 user정보,token을 가질 수 있고 사용할 수 있게 됨
        next(); // index.js> app.get('api/users/auth', auth , (req, res)=> { ... 의 middleware(auth)에서 계속 넘어갈 수 있도록(빠져나가게)함.
    })
}

module.exports = {auth}