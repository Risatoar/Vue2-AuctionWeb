<!--
随机选择9条消息列表组件
author：risatoar
date：null
-->
<template>
  <div>
    <div class="auctioninfo">
      <!-- <div class="auctioninfo-head">
      	<router-link :to="{path: '/info'}">
        <a class="head-words">拍卖公告</a>
        </router-link>
        <a class="head-more" @click="morenews">更多</a>
      </div>
       <div class="biaodan">
      输入标题  <input type="text" class="productId form-control" v-model="auction.acTitle" placeholder="请输入标题">
      输入时间  <input type="text" class="productName form-control" v-model="auction.acTime" placeholder="请输入日期：类似2017/9/9格式">
      <button class="btn btn-info" @click="addproduct">add</button>
    </div>
      <div class="auctioninfo-body" v-for="(item,index) in auctioninfo">
        <div class="auctioninfo-body-item"  @click="getinfoshow(index)" :class="[{'newsshow' : index - 4 > 0}]">
          <span class="new">NEW</span>
          <!-- <button class="delnew btn btn-danger"  @click="getnewsdel(index)">delete</button> -->
          <!-- <li class="item-title"><a href="javascript：void(0);">{{ item.acTitle }}</a></li>
          <li class="item time">时间：{{ item.acTime }}</li>
        </div>
      </div>  -->



      <!-- 消息列表组件,随机筛选9条数据进行展示 -->
      <Card style="width:350px;height:320px;">
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              消息列表
          </p>
          <!-- 点击触发随机筛选函数  -->
          <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
              Change
          </a>
          <!-- 消息及评分展示列  -->
          <ul>
              <li v-for="item in randomInfoList" style="width:320px;float:left;padding-bottom:14px;">
	          <router-link  :to="{path: '/detail/pages/' + item._id}">
	             <a style="float:left;text-align:left;" class="infotitle">{{ item.title }}</a>
	          </router-link>
              <div style="float:right;">
                <!-- 根据评分来显示星星数 -->
                  <Icon type="ios-star" v-for="n in 4" :key="n" style="color:#f5a623"></Icon><Icon type="ios-star" v-if="item.stars >= 4.5" style="color:#f5a623"></Icon><Icon type="ios-star-half" v-else style="color:#f5a623"></Icon>
                  {{ item.stars }}
              </div>
              </li>
          </ul>
      </Card>
    </div>
<!--     <newsdialog :is-show="isShowAboutDialog" v-if="showinfo" @on-close="closeDialog('isShowAboutDialog')">
    	<div class="newslist" v-for="(item,index) in auctioninfo"> 
        <div class="newslist-item"> 
          <span class="newslist-index" :class="['news' + index]">事件:{{ index+1 }}</span> 
          <li class="newslist-title"><a href="javascript：void(0);">{{ item.acTitle }}</a></li> 
          <li class="newslist-time">时间：{{ item.acTime }}</li></br>
        </div> 
      </div> 
    </newsdialog> -->
  </div>
</template>

<script>
import axios from 'axios'
import newsdialog from '../dialog.vue'
	export default {
		components: {
			newsdialog
		},
		data() {
			return {
				isShowAboutDialog: false,
				auctioninfo: [],
				showinfo: true,
				shownews: true,
				auction: {
					acTitle: '',
					acTime: ''
				},
				infoList: [],
				randomInfoList: []
			}
		},
		mounted() {
      this.getauctioninfo();
		},
		methods: {
			  // closeDialog(attr) {
     //          this[attr] = false
     //    },


        // 随机筛选9条数据进行展示
        changeLimit () {
          function getArrayItems(arr, num) {
              const temp_array = [];
              for (let index in arr) {
                  temp_array.push(arr[index]);
              }
              const return_array = [];
              for (let i = 0; i<num; i++) {
                  if (temp_array.length>0) {
                      const arrIndex = Math.floor(Math.random()*temp_array.length);
                      return_array[i] = temp_array[arrIndex];
                      temp_array.splice(arrIndex, 1);
                  } else {
                      break;
                  }
              }
              return return_array;
          }
          this.randomInfoList = getArrayItems(this.infoList, 9);
        },
  			// morenews() {
  			// 	this.isShowAboutDialog = true;
  			// },


        // 用get方法来获取数据库中消息列表
  			getauctioninfo() {
  				axios.get("/information").then((result)=>{
  					let res = result.data;
  					this.infoList = res.result.list;
  					this.changeLimit();
  				});
  			},
			// addproduct() {
			// 	////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
			// 	axios.post("/auction",this.auction).then((res)=> {
			// 		console.log(res);
			// 	}).catch((error)=> {
			// 		console.log(error);
			// 	});
			// 	this.getauctioninfo();
			// }
		}
	}
</script>

<style scoped>
@import '/static/css/auctioninfo.css'
</style>