var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Infos=require("../models/info.js")
var Previews=require("../models/previews.js")
var knowledge=require("../models/knowledge.js")
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

router.post("/pv/info/add",(req,res,next)=>{
  let infoid = ObjectID(req.body.info_id)
  Infos.update({_id:infoid},
    {$push:{watch:{
      watcher:req.body.pvid,
      watchdate:sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }}},(err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '456',
        list: doc
      });
    }
  })
})

router.post("/pv/preview/add",(req,res,next)=>{
  let previewid = ObjectID(req.body.preview_id)
  Previews.update({_id:previewid},
    {$push:{watch:{
      watcher:req.body.pvid,
      watchdate:sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }}},(err,doc1)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '456',
        list: doc1
      });
    }
  })
})

router.post("/pv/law/add",(req,res,next)=>{
  let lawid = ObjectID(req.body.law_id)
  law.update({_id:lawid},
    {$push:{watch:{
      watcher:req.body.pvid,
      watchdate:sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }}},(err,doc1)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '456',
        list: doc1
      });
    }
  })
})

router.post("/pv/knowledge/add",(req,res,next)=>{
  let knowledgeid = ObjectID(req.body.knowledge_id)
  knowledge.update({_id:knowledgeid},
    {$push:{watch:{
      watcher:req.body.pvid,
      watchdate:sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }}},(err,doc1)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      res.json({
        status: '456',
        list: doc1
      });
    }
  })
})

module.exports=router

