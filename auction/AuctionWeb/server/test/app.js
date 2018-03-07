var express = require('express')
var app = express()

app.listen(8080,function() {
	console.log('connecting...' + 'port:')
})



// *

let jsonstr = {a:1}
app.get('/',function(req,res){
	// res.download('./package.json',function(err){
	// })

	// ip拦截
	// let ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
	// console.log(ip)
	// if(ip[0] != '127.0.0.1'){
	// 	res.send('no allow ip')
	// 	res.end()
	// }

	// jsonp
	// res.jsonp(jsonstr)

	// 重定向
	res.redirect('https://www.baidu.com')
})

// 404
app.use(function(req,res){
	res.status(404).send('cannot find')
})

// app.all('*',function (req, res, next) {
// 	console.log(req,res)
// 	res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

