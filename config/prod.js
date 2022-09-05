/* 배포 후 (heroku) */
module.exports = {
    mongoURI : process.env.MONGO_URI //MONGO_URI : heroku에서의 이름과 같도록
}