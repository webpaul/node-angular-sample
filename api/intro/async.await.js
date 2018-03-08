async function foo(arg) {
    console.log("foo received: " + arg)

    //do something with arg
    arg++
    //throw 'Oh no!'

    console.log("foo returning: " + arg)
    
    return Promise.resolve(arg)
}

async function sample() {
    try {
        var result = await foo(0)
        result = await foo(result)
        result = await foo(result)
        console.log("Final value: " + result)
    } catch(ex) {
        console.log(ex)
    }
}

sample()
