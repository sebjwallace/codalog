# codalog

This is a particular logging module that traces an execution path. Within every function that codalog is used a log is created to capture the function details and the data being passed into it. Each log belongs to a unique path so that the data transformation between functions can be traced.

Sample Javascript code using codalog:

```javascript
const { capture, log } = require('codalog')

function map(people){
    log(map,people) // use codalog to associate a function to a data state
    return people.map(({
        forename,
        surname
    }) => ({
        name: `${forename} ${surname}`
    }))
}

function filter(people){
    log(filter,people)
    return people.filter(({
        surname
    }) => (
        surname === 'Turing'
    ))
}

function display(people){
    log(display,people)
    console.log(people)
}

function main(){
    const people = [
        {
            forename: 'Alan',
            surname: 'Turing'
        },
        {
            forename: 'Charles',
            surname: 'Babbage'
        }
    ]
    display(map(filter(people)))
}

capture(main) // capture starts the logging in a path context

```

Resulting logs:

```javascript
{
    path: 'PATH:tzghg3jejx3ldsmd',
    time: 1560970248997,
    func: 'filter',
    data: [
        {
            forename: 'Alan',
            surname: 'Turing'
        },
        {
            forename: 'Charles',
            surname: 'Babbage'
        }
    ]
},
{
    path: 'PATH:tzghg3jejx3ldsmd',
    time: 1560970249000,
    func: 'map',
    data: [
        {
            forename: 'Alan',
            surname: 'Turing'
        }
    ]
},
{
    path: 'PATH:tzghg3jejx3ldsmd',
    time: 1560970249215,
    func: 'display',
    data: [
        {
            fullName: 'Alan Turing'
        }
    ]
}
```

Note - the path property in the logs is the execution path id. For each execution that follows from the main function will have a unique path id.

The logs could be used for debugging - seeing how the data transforms as it moves through each function. The data in the logs could be used for mock generation.

The logging engine used under the hood is Winston. This allows the client to use whichever transport they wish - from console logs, file logs, to ElasticSearch entries, etc.