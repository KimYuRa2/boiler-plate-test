const mongoose = require('mongoose');
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

const User1 = mongoose.model('User1', user1Schema);

module.exports = {User1} // 이 모델(User1)을 다른 파일에서도 쓰기 위해 export해줌