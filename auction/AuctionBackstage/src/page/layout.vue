<!--
layout全局组件
author：risatoar
date：null
-->
<style>
   .layout{
       border: 1px solid #d7dde4;
       background: #f5f7f9;
       position: relative;
       border-radius: 4px;
       overflow: hidden;
   }
   .layout-nav{
       width: 420px;
       margin: 0 auto;
       margin-right: 20px;
   }
   .layout-footer-center{
       text-align: center;
   }
    html {
      font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: rgba(190 190 190,.8);
      margin:0;padding:0;
      word-spacing: 1px;
      cursor: pointer;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
    }

    *, *:before, *:after {
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      margin: 0;
    }

    a {
      color: inherit;
      -webkit-text-decoration-line: none;
      text-decoration-line: none;
    }

    a:link,a:visited,a:focus {
      text-decoration: none;
      outline: none;
    }

    p {
      text-decoration: none;
    }

    input,button,select,textarea{
      outline:none;
    }

    ul, li {
      list-style: none;
      margin:0;padding:0;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
</style>

<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            基础设置
                        </MenuItem>
                        <MenuItem name="3">
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            <span>risatoar</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        首页
                                    </template>
                                    <router-link to="/">
                                    <MenuItem name="1-1">网站数据</MenuItem>
                                    </router-link>
                                    <router-link to="/my">
                                    <MenuItem name="1-2">我的账号</MenuItem>
                                    </router-link>
                                    <router-link to="/setting">
                                    <MenuItem name="1-3">基础设置</MenuItem>
                                    </router-link>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        访问管理
                                    </template>
                                    <router-link to="/visit">
                                    <MenuItem name="2-1">访问信息</MenuItem>
                                    </router-link>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        拍卖公告
                                    </template>
                                    <router-link to="/addinfo">
                                    <MenuItem name="3-1">添加公告</MenuItem>
                                    </router-link>
                                    <router-link to="/manageinfo">
                                    <MenuItem name="3-2">管理公告</MenuItem>
                                    </router-link>
                                </Submenu>
                                <Submenu name="4">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        拍卖知识
                                    </template>
                                    <router-link to="/addknowledge">
                                    <MenuItem name="4-1">添加知识</MenuItem>
                                    </router-link>
                                    <router-link to="/manageknowledge">
                                    <MenuItem name="4-2">管理知识</MenuItem>
                                    </router-link>
                                </Submenu>
                                 <Submenu name="5">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        法律法规
                                    </template>
                                    <router-link to="/addlaws">
                                    <MenuItem name="5-1">添加法规</MenuItem>
                                    </router-link>
                                    <router-link to="/managelaws">
                                    <MenuItem name="5-2">管理法规</MenuItem>
                                    </router-link>
                                </Submenu>
                                 <Submenu name="6">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        拍卖预告
                                    </template>
                                    <router-link to="/addpreview">
                                    <MenuItem name="6-1">添加预告</MenuItem>
                                    </router-link>
                                    <router-link to="/managepreview">
                                    <MenuItem name="6-2">管理预告</MenuItem>
                                    </router-link>
                                </Submenu>
                                <Submenu name="7">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        用户管理
                                    </template>
                                    <router-link to="/adduser">
                                    <MenuItem name="7-1">添加用户</MenuItem>
                                    </router-link>
                                    <router-link to="/manageusers">
                                    <MenuItem name="7-2">管理用户</MenuItem>
                                    </router-link>
                                </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        	<router-view/>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">Proudly By XuXiang Copyright © 2017. All rights reserved.</Footer>
        </Layout>
    </div>
</div>
</template>

<script>
export default{
	name: 'layout',
	mounted() {
	  this.setRem()
	},
	methods: {
	  // 设置全局font-size，以便rem单位使用
	  setRem() {
	    let offWidth = window.screen.width / 30;
	    document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';
	  }
	}
}
</script>

