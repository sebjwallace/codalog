
const uniqid = require('uniqid')

module.exports = function(callback){

    const name = `TRACE:${uniqid()}`

    Object.defineProperty(
        callback,
        'name',
        {value: name, writable: false}
    )

    callback()

    return name

}