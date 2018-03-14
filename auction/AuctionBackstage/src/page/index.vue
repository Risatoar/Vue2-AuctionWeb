<template>
	<section class="index">
		<div class="visitor">
			<div class="totle-visitor visitor-card">
				<Card>
	                <p slot="title">总访问数</p>
	                <p>9999999人</p>
	                <a href="#" slot="extra">
                        <Icon type="person-stalker"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="new-visitor visitor-card">
				<Card>
	                <p slot="title">新访问数</p>
	                <p>9999人</p>
	                <a href="#" slot="extra">
                        <Icon type="person"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="totle-info visitor-card">
				<Card>
	                <p slot="title">总文章数</p>
	                <p>9999999篇</p>
	                <a href="#" slot="extra">
                        <Icon type="document-text"></Icon>
                    </a>
	            </Card>
			</div>
			<div class="new-info visitor-card">
				<Card>
	                <p slot="title">新文章数</p>
	                <p>99999篇</p>
	                <a href="#" slot="extra">
                        <Icon type="document"></Icon>
                    </a>
	            </Card>
			</div>
		</div>
		<div class="user">
			<div class="user-icon"></div>
			<div class="user-detail"></div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style>
	.index {
		width: 100%;
		min-height: 100vh;
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
		margin: .5rem 0;
		width: 35%;
		height: 7rem;
		background-color: red;

	}

	.user-icon {
		width: 100%;
		height: 70%;
		background-image: url("http://demo.cssmoban.com/cssthemes4/btzero_30_miminiummaster/asset/img/bg2.jpg");
		background-size: cover;
	}
</style>