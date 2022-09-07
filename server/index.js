const express = require('express')
const app = express()
const port = 7000
const bodyParser = require('body-parser'); //body-parser : Body데이터를 분석(parse)해서 req.body로 출력해주는 것 (client가 body(JSON/buffer/string/URL encoded data)를 가지고 server에 request를 날림)
const cookieParser = require('cookie-parser'); //요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어. request 객체에 cookies 속성이 부여된다.
const {auth} = require("./middle/auth"); // 미들웨어(auth)
/* mongoDB */
const config = require('./config/key');
const mongoose = require('mongoose'); //mongoDB 연결 - mongoose이용
mongoose.connect( config.mongoURI ,{ //mongo 아이디 비밀번호 숨기기
    useNewUrlParser:true, useUnifiedTopology:true //오류 방지 코드
}).then(()=> console.log('MongoDB connected ... ')) //mongoDB 연결 성공
.catch( err => console.log(err)); //mongoDB 연결 오류

const {User1} = require('./models/User1'); //만들어둔 user1Schema사용

//application/x-form-urlencoded 형태의 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.urlencoded({extended:true}));
//application/json 타입으로 된 것을 분석해서 가져올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

/* 회원가입 */
app.post('/api/users/register', (req,res) => {
    //회원가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다
    const user =  new User1(req.body); // req.body안에는 {name:'hello', email: '~~', password:'~~',.. } 등의 정보가 들어있음 => body parser이 있어서 가능!

    //save : mongoDB의 메서드 . 이 정보들이 user모델에 저장됨
    user.save( (err, userInfo) => {
        if(err) return res.json({success : false, err});
        return res.status(200).json({ //status(200) : 성공했다는 의미. json 형식으로 정보 전달해주기
            success : true
        })
    })
})

/* 로그인 */
app.post('/api/users/login', (req,res) => {
    //1) 요청된 email을 db(User1)에서 찾기
    User1.findOne( { email: req.body.email} , (err, user) => {
        if(!user){ //user가 없으면
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //2) 요청된email(user)이 db(User1)에 있음 => 비밀번호가 맞는지 확인
        user.comparePassword( req.body.password, (err, isMatch) => { //로그인을 위해 입력한 password와 DB에 저장된 password가 일치하는지 확인.
            if(!isMatch)
                return res.json( {loginSuccess: false, message: "비밀번호가 틀렸습니다."});
            // 3) 비밀번호가 맞음 => Token 생성
            user.generateToken( (err, user) => {
                if(err) return res.status(400).send(err); //status(400) = 에러
                //token을 저장한다. 어디에? 쿠키, 로컬 스토리지 , 세션 .. 여기서는 "쿠키"에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json( {loginSuccess: true, userId: user._id} );
            })

        })
    })
})

/* authentication을 위한 미들웨어 */
app.get('/api/users/auth', auth, (req, res) => { //auth라는 미들웨어를 통해 request를 만든 다음, callback function을 하기 전에, 중간에서 일함
    //여기까지 미들웨어를 통과해서 왔다는 것은 Authentication = true 라는 말
    res.status(200).json({ // 이렇게 정보를 주면 어떤 페이지에서든지 user정보를 이용할 수 있게 되어 편함
        // user정보 제공해주기
        _id : req.user._id,
        isAdmin : req.user.role === 0? false : true, // role이 0이면 일반 유저(isAdmin:false), role이 0이 아니면 관리자(isAdmin:true)
        isAuth: true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role: req.user.role,
        image : req.user.image
    })
})


/* 로그아웃 : 로그아웃 하려는 유저를 DB에서 찾아서 , 그 유저의 토큰을 지워줌. (토큰을 지워주면 인증이 안돼서, 로그인 기능이 풀림) */
app.get('/api/users/logout', auth, (req,res)=> {
    //로그아웃 하려는 유저를 DB에서 찾아서
    User1.findOneAndUpdate( {_id: req.user._id}, {token: ""}, (err, user) => {  //auth 미들웨어에서 req에 넣어준 id를 찾아서, token을 지워줌("")
        if(err) return res.json({ success : false, err });
        return res.status(200).send({ // 로그아웃 성공
            success : true
        })
    })
})


/* axios 실습!! */
app.get("/api/hello", (req,res)=>{
    res.send("안녕하세요!");
})





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})