strict middleware
==================

strict method ,convert and validate arguments, is huskies middleware.

example
=======

```javascript

var hus = require("huskies"),
    strict = require("./");
    
    function test(name,age){
        console.log(arguments)
    }
    
    var wrap = hus(test)
                .use(strict)
                .set(String,min:5,Number)
                .seal();
    
    wrap("brighthas",25);
    
    wrap("leo",false); // throw error, type error.

```
Install for component
=====================
  
  Install with [component(1)](http://component.io):

    $ component install brighthas/strict

npm install
============

    npm install huskies-strict

core strict type
=================

    Date
    Object
    String
    Boolean
    RegExp
    Array
    Number
    Function

```

custom converter and validater
==============================


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
        .set(String),
    
    setType:
        huskies(function(type){
            this._type = type;
        })
        .use(strict)
        .set(Type,{len:5})
    
}

var article = new Article();

article.setType({name:"ttttt"});

console.log(article._type instanceof Type)  // true
console.log(article._type.name) // ttttt

article.setType(new Type("aaaaa"));
console.log(article._type.name) // ttttt
```

default value
=============

```javascript
   // if set default value, the arg no validat.
   set(String,{default:"brighthas"})
```

dumb
====

```javascript

    .use(...)
    .set(...)
    .set(true) // set dumb is true.
    .seal();

    // set dumb=true , then if convert or validate fail , no throw error , return ParamError object .
    // and default dumb = false , then if convert or validate fail , then throw error.

```

Number type validater
===================

```javascript

   Number validater
     set(Number,{min:3,max:12})

```

String type validater
======================

```javascript

   String validater
   
     set(String,{min:3,max:12})
     
     set(String,{regexp:/abc/})
     
     set(String,{len:10})
     
     set(String,{type:"mail"})
         // type : mail | url | ip | ipv4 | ipv6 | int | float

```
LICENSE
=======

   MIT

