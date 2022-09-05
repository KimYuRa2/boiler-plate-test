if(process.env.NODE_ENV === 'production'){ //배포 후
    module.exports = require('./prod');
}else{ //local
    module.exports = require('./dev');
}