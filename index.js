const express = require('express')
const app = express()
const port = 7000
const bodyParser = require('body-parser'); //body-parser : Body데이터를 분석(parse)해서 req.body로 출력해주는 것 (client가 body(JSON/buffer/string/URL encoded data)를 가지고 server에 request를 날림)
const cookieParser = require('cookie-parser'); //요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어. request 객체에 cookies 속성이 부여된다.

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
app.post('/register', (req,res) => {
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
app.post('/login', (req,res) => {
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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})