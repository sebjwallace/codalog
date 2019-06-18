const { expect } = require('chai')

const capture = require('../src/capture')

describe('capture', function(){

	it('should rename the wrapper function', function(){
		function func(){}
		const name = capture(func)
		expect(func.name).to.equal(name)
	})

})