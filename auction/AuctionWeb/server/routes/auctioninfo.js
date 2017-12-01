var express=require("express")
var router=express.Router()
var mongoose=require("mongoose")
var Goods=require("../models/auction.js")

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

router.get("/auction",function(req,res,next){
  Goods.find({}, function (err,doc){
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

// router.post("/addgoods",(req,res,next)=>{
//   new Goods(req.body).save((err,doc)=>{
//     if(err){
//       console.log(err)
//     }
//     else{
//       res.json({
//           list: doc
//       })
//     }
//   })
// })


module.exports=router