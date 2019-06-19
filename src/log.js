
const { createLogger, transports } = require('winston')
const logger = createLogger({
	transports: [
		new transports.File({
			filename: 'logs.log'
		})
	]
})

module.exports = function (func, data) {

	const callStack = getCallStack()
	const id = getTraceId(callStack)
	const time = Date.now()

	logger.log({
		level: 'info',
		id,
		time,
		func: func.name,
		data
	})

}

function getTraceId(callStack) {

	callStack = callStack || getCallStack()
	return callStack.match(/PATH\:\w+/)[0]

}

function getCallStack() {

	return new Error().stack

}