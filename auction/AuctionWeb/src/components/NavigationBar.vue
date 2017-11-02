<template> 
  <div class="NavigationBar"> 
    <a href="#" class="logo"> 
      浙江省天台县拍卖信息网 
    </a> 
    <div class="Navigation"> 
        <ul id="navi"> 
        <li v-for="item in items"> 
          {{ item.name }} 
        </li>  
        </ul> 
    </div> 
  </div> 
</template> 
 
<script> 
export default { 
  name: 'NavigationBar', 
  data() { 
    return { 
      items: [ 
      { 
        name: '首页' 
      }, 
      { 
        name: '拍卖公告' 
      }, 
      { 
        name: '法律法规' 
      }, 
      { 
        name: '拍卖知识' 
      }, 
      { 
        name: '拍卖预告' 
      }, 
      { 
        name: '联系我们' 
      } 
      ] 
    } 
  } 
} 
</script> 
 
<style scoped> 
.NavigationBar{
  background-color: #222222;
  height: 50px;
  width: 100%;
  -webkit-box-shadow:2px 2px 5px #333333;
          box-shadow:2px 2px 5px #333333;
}
.NavigationBar .logo{
  font-size: 24px;
  color: #fff;
  float: left;
  line-height: 50px;
  padding: 0 150px 0 150px;
  text-decoration: none;
}
.NavigationBar ul{
  text-decoration-line: none;
  list-style-type: none;
}
.NavigationBar li{
  font-size: 24px;
  color: #fff;
  float: left;
  line-height: 50px;
  width: 8%;
  background-color: #080808;
}
.NavigationBar li:hover{
  background-color: #222222;
  cursor: pointer;
}
</style>