var hus = require("huskies"),
    strict = require("./");
    
    function test(name,age){
        console.log(arguments)
    }
    
    var wrap = hus(test)
                .use(strict)
                .set({type:String,params:{min:5}})
                .set({type:Number})
                .seal();
    
    wrap("brighthas",25);
    
    wrap("ledfdfdo",false); // throw error.