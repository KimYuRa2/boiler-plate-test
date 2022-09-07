const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); //정보를 안전하게 전송하기 위해 정의된 공개된 표준 (RFC 7519) //디지털 서명에 의해 검증할 수 있으며 신뢰할 수 있습니다. 
const bcrypt = require('bcrypt'); //암호 해싱 함수
/*
bcrypt 사이트에서 사용법 참조 !
    - 먼저 salt 생성 후, 그 생성된 salt로 비밀번호 암호화시킴
    : 10자리인 salt를 생성(saltRounds=10)하고, 이 salt를 이용해서 비밀번호 암호화
*/;
const saltRounds = 10;


const user1Schema = mongoose.Schema({
    name: {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true  // 사이 스페이스를 없애주는 역할
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type: String,
        maxlength : 50
    },
    role : {
        type : Number,// 예를 들면 0이면 관리자, 1이면 일반 유저로 설정하기 위해
        default : 0
    },
    image : String,
    token : { // 유효성 관리
        type : String
    },
    tokenExp : { //token이 사용할 수 있는 기간 설정
        type : Number
    }
})

/* user1모델에 유저 정보를 저장(index.js에서 user.save)하기 전에 function을 수행하고 나서! index.js의 register route 안의 다른 것들을 수행해라. */
user1Schema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){ // password변경될 때만 수행합니다
        //비밀번호 암호화
        bcrypt.genSalt( saltRounds, function(err,salt){ //salt 10개 생성
            if(err) next(err) //next()는 user.save하는 곳으로 넘어가는 메소드
            bcrypt.hash(user.password, salt, function(err, hash){ // 진짜pw , salt, function(err,hash-암호화된pw)
                if(err) return next(err);
                user.password = hash; //암호화된 pw를 user.password에 저장하고
                next(); //user.save로 넘어감
            })

        })
    } else{ // password 외 다른것 변경 시 실행
        next()
    }
})

/* 요청한(입력한) password와 DB에 저장된 password가 일치하는지 비교 */
user1Schema.methods.comparePassword = function(plainPassword, cb) { //plainPassword : req.body.password(입력한 패스워드)
    //plainpassword(1234567), this.password(암호화된 비밀번호)
    bcrypt.compare( plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch); //err없고 isMatch(입력pw == 암호화된pw)함
    })
}

/* 비밀번호 일치할 시 token 생성 */
user1Schema.methods.generateToken = function(cb) {
    var user= this;
    //user._id + 'secretToken' = token 만듦
    //나중에 token 생성할 때 'secretToken'를 넣으면 => user._id가 나옴.
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save( function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

/* 로그인 된 상태에서(token 부여됨) 인증(Authentication) 확인을 위해  => token 복호화(decode) 후 나온 user id를 이용해서 유저를 찾은 다음 , 클라이언트에서 가져온 token과 보관된 token이 일치하는지 확인  */
user1Schema.statics.findByToken = function( token, cb ){
    var user = this;
    //user._id + "secretToken" = token
    jwt.verify( token, 'secretToken' , function(err, decoded){ //token을 decode(복호화)한다
        user.findOne({ "_id" : decoded, "token" : token }, function( err,user ){
            //token decode 후 나온 user id(_id)를 이용해서 유저를 찾은 다음
            //클라이언트에서 가져온 token과 보관된 token이 일치하는지 확인
            if(err) return cb(err);
            cb(null, user) 
        })
    })
}

const User1 = mongoose.model('User1', user1Schema);

module.exports = {User1} // 이 모델(User1)을 다른 파일에서도 쓰기 위해 export해줌