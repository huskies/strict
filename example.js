var hus = require("../huskies"),
    strict = require("./");
    
    function test(name,age){
        console.log(arguments)
    }
    
    var wrap = hus(test)
                .use(strict)
                .set(String,{min:5},Number,true)
                .seal();
    
    wrap("brighthas",25);
    
    wrap("ddddfds",false); // throw error.