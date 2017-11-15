<template>
	<div>
		<div class="head">
			<div class="head-inner">
				<div class="head-inner-company">
					<p> {{ company }} </p>
				</div>
				<div class="head-inner-nav">
					<ul>
						<li v-for="item in navLists"> {{ item.name }} </li>
					</ul>
				</div>
				<div class="head-inner-login">
					<li v-if="username === ''">管理员登录</li>
					<li class="nav-pile" >|</li>
					<li @click="aboutClick">关于我们</li>
				</div>
			</div>
		</div>
		<div class="content">
		  <keep-alive>
			<router-view></router-view>
		  </keep-alive>
		</div>
		<div class="foot">
			<p>
				Proudly By XuXiang Copyright © 2017. All rights reserved.
			</p>
		</div>
		<dialog-box :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
			公司名称：{{ company }} <br>
			公司电话：110
		</dialog-box>

	</div>
</template>

<script>
    import loading from './LoadingPage.vue'
    import dialogBox from './dialog.vue'
	export default{
		name: 'layout',
		components: {
			loading,
			dialogBox
		},
		data() {
			return {
				username: '',
				isShowAboutDialog: false,
				company: '天台始丰拍卖有限公司',
				navLists: [
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
				}
				]
			}
		},
		methods: {
			aboutClick() {
			  this.isShowAboutDialog = true
			},
			closeDialog(attr) {
              this[attr] = false
            }
		}
	}
</script>

<style>
*
{
    font: inherit;
    font-size: 100%;

    margin: 0;
    padding: 0;

    vertical-align: baseline;

    border: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

a
{
    text-decoration-line: none;
}

p
{
    text-decoration: none;
}

ul,
li
{
    list-style: none;
}

table
{
    border-spacing: 0;
    border-collapse: collapse;
}

body
{
    font-size: 16px;
    line-height: 1;

    color: #000;
}

.head
{
    line-height: 50px;

    width: 100%;
    height: 80px;

    background-color: #222;
    -webkit-box-shadow: 2px 2px 5px #333;
            box-shadow: 2px 2px 5px #333;
}

.head-inner
{
    width: 1200px;
    margin: 0 auto;
}

.head-inner-company
{
    font-size: 24px;
    line-height: 80px;

    float: left;

    width: 300px;

    color: #fff;
}

.head-inner-nav
{
    font-size: 24px;
    line-height: 80px;

    float: left;

    margin: 0 auto;

    color: #fff;

}

.head-inner-nav li
{
    font-size: 20px;
    line-height: 80px;

    float: left;

    width: 100px;

    text-align: center;

    color: #fff;
    background-color: #080808;
}

.head-inner-nav li:hover
{
    cursor: pointer;

    background-color: #222;
}

.head-inner-login
{
    float: right;

    color: #fff;
}

.head-inner-login li
{
    line-height: 80px;

    float: left;

    cursor: pointer;
}

.nav-pile
{
    padding: 0 10px;
}

.foot
{
    line-height: 80px;

    clear: both;

    text-overflow: ellipsis;
     white-space: nowrap;

    width: 100%;
    height: 80px;

    text-align: center;

    background: #e3e4e8;
}

</style>