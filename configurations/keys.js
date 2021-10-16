if(process.env.NODE_ENV === "production"){
    module.exports = require('./peoduction');
}
else {
    module.exports = require('./dev');
}