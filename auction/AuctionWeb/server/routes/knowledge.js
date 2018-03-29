var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var knowledge=require("../models/knowledge.js")
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

router.get("/knowledge", function (req,res,next) {
  let page = parseInt(1);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let knowledgeModel = knowledge.find({}).skip(skip).limit(pageSize);
  knowledgeModel.sort({'date':-1});
  knowledgeModel.exec(function (err,doc) {
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

router.post("/knowledge/list", function (req,res,next) {
  let page = parseInt(req.body.pagecount);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let knowledgeModel = knowledge.find({}).skip(skip).limit(pageSize);
  knowledgeModel.sort({'date':-1});
  knowledgeModel.exec(function (err,doc) {
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

router.get("/knowledge/Count",function(req,res,next){
  knowledge.find({}, function (err,doc){
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

router.post("/knowledge/detail",function(req,res,next){
  let _knowledge = req.body
  let knowledgeid = ObjectID(_knowledge.knowledgeid)
  knowledge.findOne({_id:knowledgeid}, (err,doc)=>{
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

router.post("/knowledge/del",function(req,res,next){
  let delid = ObjectID(req.body.delid)
  knowledge.findOne({_id:delid}, (err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      knowledge.remove({_id:delid},(err,rescult)=>{
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

