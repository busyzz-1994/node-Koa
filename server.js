const http = require('http');
const urlLib = require('url');
http.createServer((req,res)=>{
    let url = req.url;
    if(url!='/favicon.ico'){
        let urlParse = urlLib.parse(url,true);
        console.log(urlParse);
        res.end();
    }else{
        res.end();
    }
    
}).listen(8088)