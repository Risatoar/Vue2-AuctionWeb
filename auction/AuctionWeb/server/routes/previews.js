var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Previews=require("../models/previews.js")
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

router.get("/allpreviews", function (req,res,next) {
  let page = parseInt(1);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let PreviewsModel = Previews.find({}).skip(skip).limit(pageSize);
  PreviewsModel.sort({'date':-1});
  PreviewsModel.exec(function (err,doc) {
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

router.post("/preview/list", function (req,res,next) {
  let page = parseInt(req.body.pagecount);
  let pageSize = parseInt(16);
  let skip = (page-1)*pageSize;
  let PreviewsModel = Previews.find({}).skip(skip).limit(pageSize);
  PreviewsModel.sort({'date':-1});
  PreviewsModel.exec(function (err,doc) {
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

router.get("/preview/Count",function(req,res,next){
  Previews.find({}, function (err,doc){
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

router.post("/userpreview", function (req,res,next) {
  let _user = req.body
  let username=_user.username;
  let pagecount = _user.pagecount;
  let page = parseInt(pagecount);
  let pageSize = parseInt(6);
  let skip = (page-1)*pageSize;
  let PreviewsModel = Previews.find({author:username}).skip(skip).limit(pageSize);
  PreviewsModel.sort({'date':-1});
  PreviewsModel.exec(function (err,doc) {
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

router.post("/addpreview",(req,res,next)=>{
  let previewma = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    covermap: req.body.covermap,
    maintext: req.body.maintext,
    saleprice: req.body.saleprice,
    startdate: req.body.setdate[0],
    finaldate: req.body.setdate[1],
    finaltime: req.body.setdate[2],
    watch: [
    {
      watcher: req.body.author,
      watchdate: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    }
    ],
    watchcount: 1,
    date: sd.format(new Date(), 'YYYY-MM-DD HH:mm')
  };
  new Previews(previewma).save((err,doc)=>{
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

router.post("/previewdetail",function(req,res,next){
  let _pre = req.body
  let preid = ObjectID(_pre.previewid)
  Previews.findOne({_id:preid}, (err,doc)=>{
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

router.post("/previewdetail/modify",function(req,res,next){
  let _pre = req.body
  let preid = ObjectID(_pre._id)
  Previews.update({_id:preid},
    {$set:{title:req.body.title,
           covermap:req.body.covermap,
           description:req.body.description,
           maintext:req.body.maintext,
           saleprice:req.body.saleprice,
           startdate: req.body.setdate[0],
           finaldate: req.body.setdate[1],
           finaltime: req.body.setdate[2],}},(err,doc)=>{
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

router.post("/previewdetail/del",function(req,res,next){
  let _pre = req.body
  let delid = ObjectID(_pre.delid)
  Previews.findOne({_id:delid}, (err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      if(doc.author == _pre.username) {
        Previews.remove({_id:delid},(err,rescult)=>{
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

router.post("/preview/del",function(req,res,next){
  let delid = ObjectID(req.body.delid)
  Previews.findOne({_id:delid}, (err,doc)=>{
    if(err){
      res.json({
        status: '1',
        msg: err.message
      });
    }else {
      Previews.remove({_id:delid},(err,rescult)=>{
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

