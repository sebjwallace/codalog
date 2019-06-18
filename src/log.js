
const redis = require('redis')
const client = redis.createClient()

module.exports = function(func,data){

    const callStack = getCallStack()
    const id = getTraceId(callStack)
    const time = Date.now()
    const log = JSON.stringify({
        func: func.name,
        data,
        callStack
    })

    client.set(`${id}:${time}`, log)
    client.keys(`${id}:*`,(err,keys) => console.log(keys))

}

function getTraceId(callStack){

    callStack = callStack || getCallStack()
    return callStack.match(/TRACE\:\w+/)[0]

}

function getCallStack(){

    return new Error().stack

}