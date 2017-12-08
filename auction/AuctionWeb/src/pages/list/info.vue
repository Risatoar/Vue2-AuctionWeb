<template> 
  <div> 
    <div class="auctioninfo"> 
      <div class="auctioninfo-head"> 
        <a class="head-words">拍卖公告</a> 
        <a class="head-more" @click="morenews">更多</a> 
      </div> 
       <div class="biaodan">
      输入标题  <input type="text" class="productId form-control" v-model="auction.acTitle" placeholder="请输入标题">
      输入时间  <input type="text" class="productName form-control" v-model="auction.acTime" placeholder="请输入日期：类似2017/9/9格式">
      <button class="btn btn-info" @click="addproduct">add</button>
    </div>
      <div class="auctioninfo-body" v-for="(item,index) in info"> 
        <div class="auctioninfo-body-item" v-if="shownews" @click="getinfoshow(index)"> 
          <span class="new">NEW</span> 
          <!-- <button class="delnew btn btn-danger"  @click="getnewsdel(index)">delete</button> -->
          <li class="item-title"><a href="javascript：void(0);">{{ item.acTitle }}</a></li> 
          <li class="item time">时间：{{ item.acTime }}</li> 
        </div> 
      </div> 
    </div>
    <newsdialog :is-show="isShowAboutDialog" v-if="showinfo" @on-close="closeDialog('isShowAboutDialog')">
    	<div class="newslist" v-for="(item,index) in auctioninfo"> 
        <div class="newslist-item"> 
          <span class="newslist-index" :class="['news' + index]">事件:{{ index+1 }}</span> 
          <li class="newslist-title"><a href="javascript：void(0);">{{ item.acTitle }}</a></li> 
          <li class="newslist-time">时间：{{ item.acTime }}</li></br>
        </div> 
      </div> 
    </newsdialog>
  </div> 
</template> 

<script>
import axios from 'axios'
import newsdialog from '../../components/dialog.vue'
	export default {
		components: {
			newsdialog
		},
		data() {
			return {
				isShowAboutDialog: false,
				info: [],
				showinfo: true,
				shownews: true,
				auction: {
					acTitle: '',
					acTime: ''
				}
			}
		},
		mounted() {
			this.getauctioninfo();
			this.getinfoshow(index);
		},
		methods: {
			closeDialog(attr) {
              this[attr] = false
            },
			morenews() {
				this.isShowAboutDialog = true;
			},
			getinfoshow(index) {
				// if(index>2){
				// 	this.shownews = false;
				// }
			},
			getauctioninfo() {
				axios.get("/auction").then((result)=>{
					console.log(result)
					let res = result.data;
					this.info = res.result.list;
				});
			},
			addproduct() {
				////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
				axios.post("/auction",this.auction)
				.then((res)=> {
					console.log(res);
				}).catch((error)=> {
					// console.log('error' + error);
				});
				this.getauctioninfo();
			},
			getnewsdel(index) {
				let id = auctioninfo.info;
			}
		}
	}
</script>

<style scoped>
@import '/static/css/info.css'
</style>