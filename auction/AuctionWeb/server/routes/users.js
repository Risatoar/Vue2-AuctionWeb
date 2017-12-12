var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Users=require("../models/users.js")

mongoose.connect('mongodb://127.0.0.1:27017/auction')


mongoose.connection.on('connected',function(){
  console.log("MongoDB connected success.")
})


mongoose.connection.on('error',function(){
  console.log("MongoDB connected fail.")
})

mongoose.connection.on('disconnected',function(){
  console.log("MongoDB connected disconnected.")

})

// 获取所有user的信息
router.get("/users",function(req,res,next){
  Users.find({}, function (err,doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count:doc.length,
          list:doc
        }
      });
    }
  })
})

// 用户登录
router.post("/login",(req,res,next)=>{
  let _user = req.body;
  let username = _user.username;
  let pwd = _user.pwd;
  let user = new Users(_user)
  Users.findOne({username:username}, (err, user)=> {
    if(err){
      console.log(err);
    }
    else{
      return res.redirect('/')
    }
  })
})

// 用户注册操作
router.post("/register",(req,res,next)=>{
  let _user = req.body;
  Users.findOne({username:_user.username},(err,user)=>{
    if(err){
      console.log(err)
    }
    if(user){
      return res.json({
        list : '用户名已注册'
      });
    }else{
      let user = new Users(_user);
      user.save((err,user)=>{
        if(err){
          console.log(err);
        }else{
          res.json({
            save: '注册成功'
          })
        }
      })
    }
  })
  // new Users(req.body).save((err,doc)=>{
  //   if(err){
  //     console.log(err)
  //   }
  //   else{
  //     res.json({
  //         list: doc
  //     })
  //   }
  // })
})


module.exports=router

