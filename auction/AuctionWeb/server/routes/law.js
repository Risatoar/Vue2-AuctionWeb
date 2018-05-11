var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var law=require("../models/law.js")
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

router.get("/law", function (req,res,next) {
  let page = parseInt(1);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let lawModel = law.find({}).skip(skip).limit(pageSize);
  lawModel.sort({'date':-1});
  lawModel.exec(function (err,doc) {
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

router.post("/laws/list", function (req,res,next) {
  let page = parseInt(req.body.pagecount);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let lawModel = law.find({}).skip(skip).limit(pageSize);
  lawModel.sort({'date':-1});
  lawModel.exec(function (err,doc) {
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

router.get("/laws/Count",function(req,res,next){
  law.find({}, function (err,doc){
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
        }
      });
    }
  })
})

router.post("/law/add",(req,res,next)=>{
  let lowma = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    maintext: req.body.maintext,
    covermap: req.body.covermap,
    date: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  };
  new law(lowma).save((err,doc)=>{
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

router.post("/law/modify",function(req,res,next){
  let _info = req.body
  let infoid = ObjectID(_info._id)
  law.update({_id:infoid},
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

router.post("/law/detail",function(req,res,next){
  let _law = req.body
  let lawid = ObjectID(_law.lawid)
  law.findOne({_id:lawid}, (err,doc)=>{
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

router.post("/laws/del",function(req,res,next){
  let delid = ObjectID(req.body.delid)
  law.findOne({_id:delid}, (err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      law.remove({_id:delid},(err,rescult)=>{
        if(err){
          console.log(err)
        }else {
          res.json({
            status: '222'
          })
        }
      })
    }
  })
})

module.exports=router

