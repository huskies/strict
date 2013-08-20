
var check = require("validator").check;

function throwErr(){
    throw new Error;
}

module.exports = [
    {
        type: String,
        validater: function (arg, params) {

            var keys = Object.keys(params);

            keys.forEach(function (key) {

                switch (key) {

                    case "min":
                        if (arg.length < params.min) {
                            throw new Error("min error!");
                        }
                        break;
                    case "max":
                        if (arg.length > params.max) {
                            throw new Error("max error!");
                        }
                        break;
                    case "len":
                        if(arg.length !== params.len){
                            throw new Error(arg + " string length !== "+params.len);
                        }
                        break;
                    case "regexp":
                        params.regexp.test(arg) ? true : throwErr() ;
                        break;

                    case "type":
                        var type = params.type;
                        switch(type){
                            case "mail":
                                check(arg).isEmail()
                                break;
                            case "url":
                                check(arg).isUrl();
                                break;
                            case "ip":
                                check(arg).isIP();
                                break;
                            case "ipv4":
                                check(arg).isIPv4()
                                break;

                            case "ipv6" :
                                check(arg).isIPv6();
                                break;
                            case "int":
                                check(arg).isInt();
                                break;
                            case "float":
                                check(arg).isFloat();
                                break;
                            default:
                                throw new Error("type error!")
                                break;

                        }
                        break;
                }

            })

        }
    },
    {type:Number,validater:function(value,params){
        var keys = Object.keys(params);
        keys.forEach(function(key){
            switch(key){

                case "min":
                    value < params.min ? null : throwErr();
                    break;

                case "max":
                    value > params.max ? null : throwErr();
                    break;

            }
        })
    }}
]