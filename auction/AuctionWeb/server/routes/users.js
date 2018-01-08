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

// 获取某一个用户的信息
router.post("/userdetails",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      res.json({
        status: '0',
        msg: '',
        result: {
          list:user
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
      res.cookie("user", _user.usernamelogin, {maxAge : 300000});
      res.cookie("admin", user.admin, {maxAge : 300000});
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

router.post("/ChangePwd",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      if(req.body.oldPwd == user.pwd){
        Users.update({username:req.body.username},{$set:{pwd:req.body.newPwd1}},(err,user)=>{
          if(err){
            console.log(err)
          }else{
            return res.json({
            status: '1001'
            })
          }
        })
      }else{
        return res.json({
          status: '1002'
        })
      }
    }
  })
})

router.post("/edit/nickname",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{nickname:req.body.nickname}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

router.post("/edit/age",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{age:req.body.age}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

router.post("/edit/truename",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{truename:req.body.truename}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

router.post("/edit/company",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{company:req.body.company}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

router.post("/edit/telephone",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{telephone:req.body.telephone}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

router.post("/edit/mail",function(req,res,next){
  Users.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err)
    }else {
      Users.update({username:req.body.username},{$set:{mail:req.body.mail}},(err,user)=>{
        if(err){
          console.log(err)
        }else{
          return res.json({
          status: '1001'
          })
        }
      })
    }
  })
})

module.exports=router

