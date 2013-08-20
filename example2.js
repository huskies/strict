
var huskies = require("huskies"),
    strict = require("./");

// set converter for Type.
strict.converter(Type,function converter(value){
    console.log(value)
    if(value.name){
        return new Type(value.name);
    }else{
        throw new Error("convert Type error!");
    }
})

// set validater for Type.
strict.validater(Type,function validater(value,params){
     if(params.len && value.name.length === params.len){
     }else{
        throw new Error;
     }
});

function Type(name){
     this.name = name;
}

function Article(){
    this._name = null;
    this._type = null;
}

Article.prototype = {

    setName:
        huskies(function(name){
            this._name = name;
        })
        .use(strict)
        .set({type:String}),
    
    setType:
        huskies(function(type){
            this._type = type;
        })
        .use(strict)
        .set({type:Type,params:{len:5}})
    
}

var article = new Article();

article.setType({name:"ttttt"});

console.log(article._type instanceof Type)  // true
console.log(article._type.name) // ttttt

article.setType(new Type("aaaaa"));
console.log(article._type.name) // ttttt