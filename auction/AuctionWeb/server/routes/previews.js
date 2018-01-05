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

router.get("/allpreviews",function(req,res,next){
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
          list:doc
        }
      });
    }
  })
})

router.post("/addpreview",(req,res,next)=>{
  let previewma = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    maintext: req.body.maintext,
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



module.exports=router

