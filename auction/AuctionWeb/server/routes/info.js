var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Infos=require("../models/info.js")
var sd = require("silly-datetime");
var ObjectID = require('mongodb').ObjectID;

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

// router.get("/information",function(req,res,next){
//   Infos.find({}, function (err,doc){
//     if(err){
//       res.json({
//         status: '1',
//         msg: err.message
//       });
//     }else {
//       res.json({
//         status: '0',
//         msg: '',
//         result: {
//           count:doc.length,
//           list:doc
//         }
//       });
//     }
//   })
// })

router.get("/information", function (req,res,next) {
  let page = parseInt(1);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let infosModel = Infos.find({}).skip(skip).limit(pageSize);
  infosModel.sort({'date':-1});
  infosModel.exec(function (err,doc) {
      if(err){
          res.json({
            status:'1',
            msg:err.message
          });
      }else{
          res.json({
              status:'0',
              msg:'',
              result:{
                  count:doc.length,
                  list:doc
              }
          });
      }
  })
});

router.post("/userinfo", function (req,res,next) {
  let _user = req.body
  req.user=req.cookies.user;
  let page = parseInt(1);
  let pageSize = parseInt(6);
  let skip = (page-1)*pageSize;
  let infosModel = Infos.find({author:req.user}).skip(skip).limit(pageSize);
  infosModel.sort({'date':-1});
  infosModel.exec(function (err,doc) {
      if(err){
          res.json({
            status:'10002',
            msg:err.message
          });
      }else{
          res.json({
              status:'10001',
              msg:'',
              result:{
                  count:doc.length,
                  list:doc
              }
          });
      }
  })
});

router.post("/addinfo",(req,res,next)=>{
  let infoma = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    maintext: req.body.maintext,
    covermap: req.body.covermap,
    date: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  };
  new Infos(infoma).save((err,doc)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json({
          list: doc
      })
    }
  })
})

router.post("/infodetail",function(req,res,next){
  let _info = req.body
  let infoid = ObjectID(_info.infoid)
  Infos.findOne({_id:infoid}, (err,doc)=>{
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

router.post("/infomodify",function(req,res,next){
  let _info = req.body
  let infoid = ObjectID(_info._id)
  Infos.update({_id:infoid},
    {$set:{title:req.body.title,
           covermap:req.body.covermap,
           description:req.body.description,
           maintext:req.body.maintext}},(err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '456',
      });
    }
  })
})

router.post("/infodel",function(req,res,next){
  let _info = req.body
  let delid = ObjectID(_info.delid)
  Infos.findOne({_id:delid}, (err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      if(doc.author == _info.username) {
        Infos.remove({_id:delid},(err,rescult)=>{
          if(err){
            console.log(err)
          }else {
            res.json({
              status: '222'
            })
          }
        })
      }else {
        res.json({
          status: '3333'
        })
      }
    }
  })
})


module.exports=router

