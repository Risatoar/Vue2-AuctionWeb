var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Users=require("../models/users.js")
var sd = require("silly-datetime");

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
router.post("/login",(req,res)=>{
  let _user = req.body
  req.user=req.cookies.user;
  Users.findOne({username:_user.usernamelogin},(err,user)=>{
    if(err){
      console.log(err)
    }
    if(!user){
      return res.json({
        list: '该用户未被注册'
      })
    }
    if(_user.pwdlogin == user.pwd){
      res.cookie("user", _user.usernamelogin, {maxAge : 10800000});
      res.cookie("admin", user.admin, {maxAge : 10800000});
      return res.json({
        list: 'success',
        user: user
      })
    }
    if(_user.pwdlogin != user.pwd){
      return res.json({
        list: 'fail'
      })
    }
  })
  // Users.find({username:_user.usernamelogin,pwd:_user.pwdlogin},(err,user)=>{
  //   if(err){
  //     console.log(err)
  //   }
  //   if(user){
  //     return res.json({
  //       list: 'fail',
  //       doc: user
  //     })
  //   }
    // else{
    //   return res.json({
    //     list: 'success'
    //   })
    // }
  // })
})

// 用户注册操作
router.post("/register",(req,res,next)=>{
  let _user = {
    username: req.body.username,
    pwd: req.body.pwd,
    nickname: req.body.nickname,
    age: req.body.age,
    truename: req.body.truename,
    company: req.body.company,
    telephone: req.body.telephone,
    mail: req.body.mail,
    usercreatedate: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  };
  Users.findOne({username:_user.username},(err,user)=>{
    if(err){
      console.log(err)
    }
    else if(user){
      return res.json({
        list : '用户名已注册',
        doc:user
      });
    }else{
      Users.findOne({nickname:_user.nickname},(err,nickname)=>{
        if(err){
          console.log(err)
        }
        else if(nickname){
          return res.json({
            list : '该昵称已被使用',
            doc:nickname
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

