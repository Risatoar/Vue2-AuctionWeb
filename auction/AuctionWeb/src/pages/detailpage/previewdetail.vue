<!--
拍卖预告信息详情界面
author：risatoar
date：2017/12/20
-->
<template>
	<!-- 拍卖预告信息详情界面背景层 -->
	<div class="previewdetail-wrap">
		<!-- 拍卖预告信息详情界面主体层 -->
		<div class="previewdetail-body">
			<!-- 拍卖预告信息详情界面内容层 -->
			<div class="previewdetail-information">
				<!-- 拍卖预告信息详情界面内容层左侧,展示当前拍卖预告的展示图片 -->
				<div class="previewdetail-information-left">
					<img v-lazy="'/static/img/' + this.PreList.covermap" class="previewdetail-img">
				</div>
				<!-- 拍卖预告信息详情界面内容层右侧 -->
				<div class="previewdetail-information-right">
					<!-- 过长的class采用简写 -->
					<!-- 拍卖预告信息详情界面内容层右侧,展示当前拍卖预告的详细信息 -->
					<div class="pre-info-right-detail">
						<div class="pre-info-right-title">
							<h2>{{ PreList.title }}</h2>
						</div>
						<div class="pre-content">
							<div class="pre-content-wrap">
								<div class="pre-description"><Icon type="chatbox-working"></Icon><span>{{ PreList.description }}</span>
								</div>
								<div class="pre-startdate"><Icon type="ios-time"></Icon><span>拍卖开始</span>{{ PreList.startdate }}</div>
								<div class="finaldate"><Icon type="ios-stopwatch"></Icon><span>拍卖结束</span>{{ PreList.finaldate }}  {{ PreList.finaltime }}</div>
								<div class="preCompany"><Icon type="happy-outline"></Icon><span>发布人信息</span>{{ this.userdetails.username }} {{this.userdetails.company}}</div>
								<div class="preTel"><Icon type="iphone"></Icon><span>联系方式</span>{{ this.userdetails.telephone }}</div>
								<div class="preMoney"><Icon type="pricetag"></Icon><span>出售价格</span>{{ PreList.saleprice }}</div>
								<div class="watchcount"><Icon type="eye"></Icon><span>浏览次数</span>{{ watchcount + 1 }}</div>
								<div class="timeToEnd">
									<span><h2>{{ ShowWords }}</h2></span>
									<!-- 动态计算剩余时间,通过css3动画展示跳动效果,当剩余时间小于一天时展示红色,超时则展示已经结束 -->
									<div class="timeShow" :class="[lday>=1?'timeorange':'timered']" v-if="NotDead">
										<div>{{ lday }}</div><strong>天</strong>
										<div>{{lhours}}</div><strong>小时</strong>
										<div>{{lminutes}}</div><strong>分钟</strong>
										<div>{{lseconds}}</div><strong>秒</strong>
									</div>
									<div v-if="Dead" class="timeShow timered"><del>已经结束</del></div>
								</div>
							</div>
							<div class="pre-info-right-warning">
								<div class="pre-warning-title">
									拍卖须知
								</div>
								<!-- 拍卖须知区块 -->
								<article>
									<p>佛像，珊瑚，象牙，高额金银珠宝制品，燃气灶，热水器，音响，喇叭，刀具，打火机，电池，精密仪器，药品，高压气体，酒水，易燃易爆品，汽车摩托车配件，动植物等以及其他一切国家禁止入境的商品，无法运输，其中给您造成的损失洋觅网不予承担</p>
									<p>如因您购买了重量或者体积超出邮局规定的商品而造成无法邮寄的损失，洋觅网概不承担，详情请参考邮局运输标准；</p>
									<p>竞拍成功的商品一律不接受以任何形式的原因而造成的弃标，一旦发生弃标行为，洋觅网将扣除该商品金额的30%~50%+53元服务费作为弃标费。</p>
									<p>商品名中出现“垃圾”、“出租”、商品详情不完整、卖家整体信誉过低的商品，不建议竞拍。具体详情请咨询小觅在线客服。</p>
								</article>
							</div>
						</div>
					</div>
				</div>
				<!-- 拍卖预告底部主要信息介绍 -->
				<div class="previewdetail-information-bottom">
					<article v-html="PreList.maintext">
					</article>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			lday: '',
			lhours: '',
			lminutes: '',
			lseconds: '',
			DateArray: [],
			TimeArray: [],
			NotDead: true,
			Dead: false,
			user: {
			 username: ''
			},
			pre: {
				previewid:''
			},
			ShowWords: '距离结束还有',
			PreList: {},
			watchcount: '',
			userdetails: []
		}
	},
	mounted() {
		this.getUrl()
	},
	// 利用vue的watch来监控路由变化,执行getUrl函数
	watch: {
	  '$route': 'getUrl'
	},
	computed: {
		username() {
			return this.$store.state.username
		},
	},
	methods: {
		// 获取当前url的params所带的id属性,赋值给pre对象的previewid属性
		getUrl() {
			this.pre.previewid = this.$route.params.id;
			console.log(this.pre.previewid)
			if(this.pre.previewid){
				this.getPreview()
				this.postPv()
				this.getUserDetail()
			}
		},
		// 通过infoid查询对应的详情信息,查询成功后调用getTime1函数
		getPreview() {
			axios.post("/previewdetail",this.pre).then((res)=> {
				this.PreList = res.data.result.list;
				this.watchcount = res.data.result.list.watch.length
				this.getTime1();
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		// 获取发布人信息
		// 获取当前用户详细信息
        getUserDetail() {
          this.user.username = this.username;
          axios.post('/userdetails',this.user).then((res)=>{
            let _detail = res.data.result.list;
            this.userdetails = _detail;
          })
        },
		// 记录当前页面被访问的pv
		postPv() {
			axios.post("/pv/preview/add",{
				preview_id: this.$route.params.id,
				pvid: returnCitySN["cip"]
			}).then((res)=> {
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		// 利用split函数去除时间中的‘-’和‘:’字符,将处理好的函数赋给dead函数
		getTime1() {
			this.DateArray = this.PreList.finaldate.split('-');
			this.TimeArray = this.PreList.finaltime.split(':');
			this.dead(this.DateArray,this.TimeArray)
		},
		// 设置每1s执行的定时器,动态计算剩余时间
		dead(arr1,arr2) {
		  let timeChange
		  this.timeChange = setInterval(()=>{
			this.leftTimer(arr1[0],arr1[1],arr1[2],arr2[0],arr2[1],arr2[2])
		  },1000);
		  console.log(timeChange)
		},
		// 计算剩余时间
		leftTimer(year,month,day,hour,minute,second){
		  var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
		  if(new Date()>new Date(year,month-1,day,hour,minute,second)){
		  	this.NotDead=false;this.Dead=true;
		  }else if(new Date()>new Date(year,month-1,day,hour,minute,second)){
		  }
		  console.log(leftTime)
		  var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
		  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
		  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
		  var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
		  days = this.checkTime(days);
		  hours = this.checkTime(hours);
		  minutes = this.checkTime(minutes);
		  seconds = this.checkTime(seconds);
		  this.lday = days;
		  this.lhours = hours;
		  this.lminutes = minutes;
		  this.lseconds = seconds;
		},
		//将0-9的数字前面加上0，例1变为01
	    checkTime(i) {
		  if(i<10)
		  {
		    i = "0" + i;
		  }
		  return i;
		}
	},
	destroyed () {
	  // 组件关闭时清除定时器
	  clearInterval(this.timeChange)
	}
}
</script>

<style>
@import '/static/css/detailpage.css'
</style>