
module.exports = {
    capture: require('./src/capture'),
    log: require('./src/log')
}

const capture = require('./src/capture')
const log = require('./src/log')

function a(v){
    log(a,v)
    v++
    b(v)
}

function b(v){
    log(b,v)
}

capture(function(){
    a(0)
})