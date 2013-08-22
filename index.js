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

function strictmethod(avgs,_options,locals,exec){

       var options,dumb,validateParams = [],types = [];
       
        // init
        if(!locals.strict){
        
            var lastParam = _options[_options.length-1],
                j = 0,
                argsLen;
                
            if(typeof lastParam === "boolean"){
                dumb = lastParam;
                options = _options.slice(0,_options.length-1);
            }else{
                options = _options;
            }
            
            argsLen = options.length;
            
            for(var i= 0;i<argsLen;){
                if(isType(options[i])){
                   types.push(options[i]);
                   if(i+1<argsLen){
                       if(!isType(options[i+1])){
                          validateParams[j] = options[i+1];
                          i+=2;
                       }else{
                          i+=1;
                       }
                   }else{
                       i+=1;
                   }
                   j+=1;
                }else{
                   throw new ParamError("params error.")
                }
            } 
            
            locals.strict = {
                dumb:dumb,
                types:types,
                validateParams:validateParams
            }    
            
        }else{
            types = locals.strict.types;
            dumb = locals.strict.dumb;
            validateParams = locals.strict.validateParams;
        }

        
        for(var i=0,len = types.length; i<len ; i++){
            
           var arg = avgs[i];
           var type = types[i];
           var params = validateParams[i];
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
                   }else{
                       if(!coreTypeValidate(arg,type)){
                            throw new ParamError("argument"+i+" type error");
                       }                   
                   }

                   
                   if(params && validater){
                        
                        if(validater(arg,params) === false){
                              throw new ParamError("validat error");
                        }
                   }

               }catch(e){
                    if(dumb){
                        exec(false)
                    }else{
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
