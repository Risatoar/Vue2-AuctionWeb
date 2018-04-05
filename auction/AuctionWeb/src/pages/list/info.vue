<!--
拍卖公告右侧列表组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<!-- 拍卖公告列表组件界面背景层 -->
	<div class="info-wrap">
		<!-- 拍卖公告列表组件界面主体层 -->
		<div class="info-body">
			<div class="info-body-top">
				<!-- 拍卖公告列表组件界面副标题 -->
				<span class="info-body-top-content" v-touch-ripple>最新消息</span>
			</div>
			<div class="info-body-list">
				<!-- 页面加载loding动画 -->
				<div v-if="loading">
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
				</div>
				<!-- 拍卖公告信息列表展示 -->
				<div v-for="item in infolist">
					<router-link :to="{path: 'info/' + item._id}">
						<div class="info-body-list-block" v-touch-ripple>
							<div class="list-block-left">
								<img class="left-img" v-lazy="'/static/img/uploads/' + item.covermap" style="background-color:#fff;">
							</div>
							<div class="list-block-right">
								<a class="block-right-title">
									{{ item.title }}
								</a>
								<p class="block-right-description" v-html="item.description">
								</p>
								<div class="block-right-foot">
									<p>
										<span class="block-right-author">
											作者：{{ item.author }}
										</span>
										<span class="block-right-date">
											发布时间：{{ item.date }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</router-link>
				</div>
				<div class="view-more-normal"
				     v-infinite-scroll="loadMore"
				     infinite-scroll-disabled="busy"
				     infinite-scroll-distance="10"
				     >
				  <img src="../../assets/loading-spinning-bubbles.svg" v-show="loadingMore">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import VueTouchRipple from 'vue-touch-ripple'
export default {
	components: {
		VueTouchRipple
	},
	data() {
		return {
			busy: true,
			infolist: [],
			data: [],
			loading: false,
			loadingMore: false,
			page: 1,
			pagecount: 0,
		}
	},
	mounted() {
		this.getinfo();
		this.getInfoCount();
	},
	methods: {
		// 返回顶部
		gotop() {
			window.scrollTo(0,0);
		},
		// 获取总页数
		getInfoCount() {
			axios.get("/infos/count")
			.then((res)=> {
				this.pagecount = res.data.result.count
			})
			.catch((err)=> {
				console.log(err)
			})
		},
		// 无限滚动回调
        loadMore(){
            this.busy = true;
            setTimeout(() => {
              this.page++;
              this.busy = false
              if(this.pagecount+16>16*this.page) this.getinfo(true)
            }, 1000);
        },
		// 获取拍卖公告消息列表
		getinfo(flag) {
			let infopost = {
				pagecount: this.page
			}
			this.loadingMore = true;
			axios.post("/infos/list",infopost).then((result)=>{
				this.loading = false;
				this.loadingMore = false;
				let res = result.data;
                this.busy = res.result.count== 0?true:false
				if(flag) {
					this.infolist = this.infolist.concat(res.result.list);
				}else this.infolist = res.result.list;
				this.busy =false;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>