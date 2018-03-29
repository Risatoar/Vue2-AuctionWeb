<template>
	<section class="index">
		<div class="visitor">
			<div class="totle-visitor visitor-card">
				<Card>
	                <p slot="title">总访问数</p>
	                <p>{{ vcount }}人</p>
	                <a href="#" slot="extra">
                        <Icon type="person-stalker"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="new-visitor visitor-card">
				<Card>
	                <p slot="title">新访问数</p>
	                <p>{{ newvcount }}人</p>
	                <a href="#" slot="extra">
                        <Icon type="person"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="totle-info visitor-card">
				<Card>
	                <p slot="title">总新闻数</p>
	                <p>{{ icount }}篇</p>
	                <a href="#" slot="extra">
                        <Icon type="document-text"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="new-info visitor-card">
				<Card>
	                <p slot="title">新新闻数</p>
	                <p>{{ pcount }}篇</p>
	                <a href="#" slot="extra">
                        <Icon type="document"></Icon>
                    </a>
	            </Card>
			</div>
		</div>
		<div class="user">
			<div class="user-inner">
				<div class="icon-detail">
					<img src="../../static/user-icon/risatoar.jpg" height="60" width="60" alt="">
					<div class="username">当前登录:{{ username }}</div>
				</div>
			</div>
			<div class="user-detail"></div>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				username: 'risatoar',
				vcount: 59,
				newvcount: 30,
				icount: 66,
				pcount: 25
			}
		},
		mounted() {
			this.getInfoCount(),
			this.getPreviewCount()
		},
		methods: {
			getInfoCount() {
                axios.get("/info/Count")
                .then(res=> {
                    this.icount = res.data.result.count
                })
                .catch(err=> {
                    console.log(err)
                })
            },
            getPreviewCount() {
                axios.get("/preview/Count")
                .then(res=> {
                    this.pcount = res.data.result.count
                })
                .catch(err=> {
                    console.log(err)
                })
            },
		}
	}
</script>

<style scoped>
	.index {
		width: 100%;
		position: relative;
	}

	.visitor {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.visitor-card {
		width: 20%;
	}

	.user {
		margin: 30px 0;
		width: 30%;
		height: 420px;
	}

	.user-inner {
		width: 100%;
		height: 70%;
		background-image: url("http://demo.cssmoban.com/cssthemes4/btzero_30_miminiummaster/asset/img/bg2.jpg");
		background-size: cover;
		padding: 2%;
		position: relative;
	}

	.icon-detail {
		left: 2%;
		bottom: 2%;
		position: absolute;
	}

	.icon-detail img {
		border: 3px solid #fff;
	}

	.username {
		font-size: 20px;
		color: #fff;
	}
</style>