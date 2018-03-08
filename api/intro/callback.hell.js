function foo(arg, callback) {
    console.log("foo received: " + arg)

    //do something with arg
    arg++

    //if some error, set it
    var err = undefined
    try {
        //throw "Oh no!"
        console.log("foo returning: " + arg)
    } catch(ex) {
        arg = undefined
        err = ex
    }
    
    callback(err, arg)
}

function sample() {
    foo(0, (err, val1) => {
        if(err) {
            console.log(err)
            return
        }

        foo(val1, (err, val2) => {
            if(err) {
                console.log(err)
                return
            }
        
            foo(val2, (err, val3) => {
                if(err) {
                    console.log(err)
                    return
                }
            
                console.log("Final value: " + val3)
            })
        })
    })
}

sample()