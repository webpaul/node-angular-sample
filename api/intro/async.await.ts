async function foo(arg: number) : Promise<number> {
    console.log("foo received: " + arg)

    //do something with arg
    arg++
    //throw 'Oh no!'

    console.log("foo returning: " + arg)
    
    return Promise.resolve(arg)
}

class MySample {
    public constructor(mySeed: number = 0) {
        this.initialValue = mySeed
    }

    private initialValue: number

    public async sample() : Promise<void> {
        try {
            var result = await foo(this.initialValue)
            result = await foo(result)
            result = await foo(result)
            console.log("Final value: " + result)
        } catch(ex) {
            console.log(ex)
        }
    }
}

new MySample(0).sample()
