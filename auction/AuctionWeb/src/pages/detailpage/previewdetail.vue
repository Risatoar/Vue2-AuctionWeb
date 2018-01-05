<template>
<div class="previewdetail-wrap" @click="getTime1">
	<div class="previewdetail-nav">
		<nav class="pre-nav-li">
			<ul>
				<li>首页</li>
				<li>拍卖公告</li>
				<li>法律法规</li>
				<li>拍卖知识</li>
				<li>拍卖预告</li>
			</ul>
		</nav>
	</div>
	<div class="previewdetail-body">
		<div class="previewdetail-information">
			<div class="previewdetail-information-left">
				<img v-lazy="'/static/img/' + this.PreList.image" class="previewdetail-img">
			</div>
			<div class="previewdetail-information-right">
				<!-- 过长的class采用简写 -->
				<div class="pre-info-right-detail">
					<div class="pre-info-right-title">
						<h2>{{ PreList.title }}</h2>
					</div>
					<div class="pre-content">
						<div class="pre-content-wrap">
							<div class="pre-description"><Icon type="chatbox-working"></Icon><span>{{ PreList.description }}</span></div>
							<div class="pre-startdate"><Icon type="ios-time"></Icon><span>拍卖开始</span>{{ PreList.startdate }}</div>
							<div class="finaldate"><Icon type="ios-stopwatch"></Icon><span>拍卖结束</span>{{ PreList.finaldate }}</div>
							<div class="watchcount"><Icon type="eye"></Icon><span>浏览次数</span>{{ PreList.watchcount }}</div>
							<div class="timeToEnd">
								<span><h2>距离结束还有</h2></span>
								<div class="timeShow" :class="[lday>=1?'timeorange':'timered']">
									<div>{{ lday }}</div><strong>天</strong>
									<div>{{lhours}}</div><strong>小时</strong>
									<div>{{lminutes}}</div><strong>分钟</strong>
									<div>{{lseconds}}</div><strong>秒</strong>
								</div>
							</div>
						</div>
						<div class="pre-info-right-warning">
							<div class="pre-warning-title">
								拍卖须知
							</div>
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
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			deadTime: '',
			infodetaillist: [],
			lday: '',
			lhours: '',
			lminutes: '',
			lseconds: '',
			DateArray: [],
			TimeArray: [],
			pre: {
				previewid:''
			},
			PreList: {
				image: '10.jpg',
				title: 'vue-lazyload',
				description: '用于图片延迟加载的 Vue 模块',
				startdate: '2017-12-01',
				finaldate: '2018-02-07',
				finaltime: '02:02:02',
				watchcount: '1'
			}
		}
	},
	mounted() {
		this.getUrl()
	},
	watch: {
	  '$route': 'getUrl'
	},
	// computed: {
	// 	dead() {
	// 		setInterval(this.leftTimer(2018,1,6,12,11,11),1000);
	// 	}
	// },
	methods: {
		getUrl() {
			this.pre.previewid = this.$route.params.id;
			console.log(this.pre.previewid)
			if(this.pre.previewid){
				this.getPreview()
			}
		},
		getPreview() {
			axios.post("/previewdetail",this.pre).then((res)=> {
				this.loading = false;
				this.PreList = res.data.result.list;
				this.getTime1();
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		getTime1() {
			this.DateArray = this.PreList.finaldate.split('-');
			this.TimeArray = this.PreList.finaltime.split(':');
			this.dead(this.DateArray,this.TimeArray)
		},
		dead(arr1,arr2) {
		  setInterval(()=>{
			this.leftTimer(arr1[0],arr1[1],arr1[2],arr2[0],arr2[1],arr2[2])
		  },1000);
		},
		leftTimer(year,month,day,hour,minute,second){
		  var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
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
	    checkTime(i){ //将0-9的数字前面加上0，例1变为01
		  if(i<10)
		  {
		    i = "0" + i;
		  }
		  return i;
		}
	}
}
</script>

<style>
@import '/static/css/detailpage.css'
</style>