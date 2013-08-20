module.exports = strictmethod;
var typeOf = require("./type");
var converters = require("./converters");
var validaters = require("./validaters");

strictmethod.Arguments = Arguments;

strictmethod.ParamError = ParamError;

function ParamError(msg){
    this.name = "ParamError";
    this.message = msg;
}

function Arguments(){
    throw new ParamError("only label, cann't call.")
}

function strictmethod(avgs,_options,locals){

        var options,dumb;
        
        // init
        if(!locals.strict){
            var lastParam = _options[_options.length-1];
            if(typeof lastParam === "boolean"){
                dumb = lastParam;
                options = _options.slice(0,_options.length-1);
            }else{
                options = _options;
            }
            locals.strict = {
                dumb:dumb,
                options:options
            }
        }else{
            options = locals.strict.options;
            dumb = locals.strict.dumb;
        }

        
        for(var i=0,len = options.length; i<len ; i++){
            
           var arg = avgs[i];
           var option = options[i];
           var type = option.type;
           var params = option.params;
           var validater = getValidation(type);

           if(!arg && params && params.default){
               avgs.splice(i,1,params.default);
           }else{
               try{

                   var converter = getConverter(type);
                
                   if(converter){
                       arg = converter(arg);
                       avgs.splice(i,1,arg);
                       if(arg === undefined){
                           throw new ParamError("argument "+i+" type error");
                       }
                   }
                   
                   if(params && validater){
                        
                        if(validater(arg,params) === false){
                              throw new ParamError("validat error");
                        }
                   }

               }catch(e){
                    if(!dumb){
                        throw e;
                    }
               }
           
        }
        }
       
}

strictmethod.paramType = "array";

strictmethod.converter = function(type,cter){
     if(!getConverter(type)){
         converters.push({type:type,converter:cter});
     }
}

strictmethod.validater = function(type,vter){
     if(!getValidation(type)){
         validaters.push({type:type,validater:vter});
     }
}

function isType(type){
    return type instanceof Function;
}

function getConverter(type){
    var cvter;
    converters.forEach(function(cvt){
        if(cvt.type === type){
            cvter = cvt.converter;
        }
    })
    return cvter;
}

function getValidation(type){
    var vter;
    validaters.forEach(function(vt){
        if(vt.type === type){
            vter = vt.validater;
        }
    })
    return vter;
}

function coreTypeValidate(o,type){

    switch(type){

        case Arguments:
            return typeOf(o) === "arguments";
            break;
        case Function:
            return typeOf(o) === "function";
            break;
        case Date:
            return typeOf(o) === "date";
            break;
        case Object:
            return typeOf(o) !== "undefined";
            break;
        case String:
            return typeOf(o) === "string";
            break;
        case Boolean:
            return typeOf(o) === "boolean";
            break;
        case RegExp:
            return typeOf(o) === "regexp";
            break;
        case Array:
            return typeOf(o) === "array";
            break;
        case Number:
            return typeOf(o) === "number";
            break;

    }
}
