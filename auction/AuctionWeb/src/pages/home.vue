<!--
  个人主页界面
  createdate: 2017/12/20
  author：risatoar
  mail：risatoar@163.com
-->
<template>
  <!-- 个人主页主体 -->
  <div class="home">
    <!-- 个人主页背景层 -->
    <div class="home-wrap">
      <!-- 个人主页内容层 -->
      <div class="home-content">
        <!-- 个人主页左侧导航,利用iview的Menu组件展示 -->
        <div class="home-left">
          <Menu :theme="theme3" active-name="1" style="height:800px;">
              <MenuGroup title="内容管理">
                  <MenuItem name="1" @click.native="showNews">
                    <Icon type="document-text"></Icon>
                    拍卖信息
                  </MenuItem>
                  <MenuItem name="2" @click.native="showPreview">
                    <Icon type="information"></Icon>
                    拍卖预告
                  </MenuItem>
                  <MenuItem name="3" @click.native="showCom">
                    <Icon type="chatbubbles"></Icon>
                    评论管理
                  </MenuItem>
              </MenuGroup>
              <MenuGroup title="用户管理">
                  <MenuItem name="4" @click.native="showUser">
                    <Icon type="heart"></Icon>
                    用户信息
                  </MenuItem>
                  <MenuItem name="5" @click.native="showChange">
                    <Icon type="heart-broken"></Icon>
                    修改密码
                  </MenuItem>
              </MenuGroup>
              <!-- 动态修改导航主体 -->
              <RadioGroup v-model="theme3" style="position: relative;margin:0 auto;color:#2d8cf0;margin-top:100px;">
                <p>修改导航栏主题</p>
                <br>
                <Radio label="light">白</Radio>
                <Radio label="dark">灰</Radio>
              </RadioGroup>
          </Menu>
          <br>
        </div>
        <!-- 个人主页中间部分,根据导航的不同展示不同区块的信息区域 -->
        <div class="home-middle">
          <newslist v-if="showNewsList"></newslist>
          <comment v-if="showComment"></comment>
          <previewlist v-if="showPreviewList"></previewlist>
          <userdetail v-if="showUserDetail" :userd="userdetails"></userdetail>
          <changepwd v-if="showChangePwd"></changepwd>
        </div>
        <!-- 个人主页右侧,展示个人头像、昵称、发布过的信息数、个人信息完整度、消息列表 -->
        <div class="home-right">
          <div class="home-usericon">
            <Card style="width:350px;">
                <div style="text-align:center">
                    <img src="../../static/img/1.jpg" height="100" width="100" style="border-radius: 100px;border: 5px solid #dddee1;margin-bottom:10px;">
                    <h3>{{ userdetails.nickname }}</h3>
                </div>
            </Card>
          </div>
          <div class="home-userdetail">
            <Card style="width:350px;">
                <p slot="title">至今为止</p>
                <p>您已经在本网站发布过0条拍卖信息</p>
            </Card>
          </div>
          <div class="home-circle">
            <p>您的个人信息完整度   <Icon type="refresh" @click.native="refreshcircle"></Icon></p>
              <br>
            <i-circle :percent="percent">
                <span class="demo-Circle-inner" style="font-size:24px">{{ percent }}%</span>
            </i-circle>
          </div>
          <div class="home-news">
            <auctioninfo></auctioninfo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import auctioninfo from '../components/news/auctionInfo.vue'
import comment from './home/comment.vue'
import newslist from './home/newslist.vue'
import previewlist from './home/previewlist.vue'
import userdetail from './home/userdetail.vue'
import changepwd from './home/changepwd.vue'
export default {
    components: {
      auctioninfo,
      comment,
      newslist,
      previewlist,
      userdetail,
      changepwd
    },
    data() {
      return {
         theme3: 'dark',
         percent: 60,
         user: {
          username: ''
         },
         userdetails: [],
         totle: 6,
         showComment: false,
         showNewsList: false,
         showPreviewList: false,
         showUserDetail: false,
         showChangePwd: false
      }
    },
    // computed: {
    //   isComple() {
    //     let cont = 0;
    //     console.log(this.userdetails.nickname)
    //   }
    // },
    mounted() {
      this.getUsername()
      this.showNews()
    },
    methods: {
      // 设置获取cookie代理方法
      getCookie (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
        },
        // 获取当前用户名
        getUsername () {
          this.user.username = this.getCookie("user")
          this.getUserDetail()
        },
        // 获取当前用户详细信息
        getUserDetail() {
          axios.post('/userdetails',this.user).then((res)=>{
            this.userdetails = res.data.result.list;
            this.refreshcircle()
          })
        },
        // 计算个人信息完整度
        refreshcircle() {
          if(this.userdetails.age === "" && this.userdetails.nickname === ""){
            this.percent = (6/8)*100
          }else if(this.userdetails.age !== "" && this.userdetails.nickname === ""){
            this.percent = 87.5
          }else if(this.userdetails.age === "" && this.userdetails.nickname !== ""){
            this.percent = 87.5
          }else if(this.userdetails.age !== "" && this.userdetails.nickname !== ""){
            this.percent = 100
          }
          this.success()
        },
        success () {
          this.$Message.success('刷新成功');
        },
        // setTimeoutRef() {
        //   let _this = this
        //   setTimeout(_this.refrshcircle(),100)
        // },
        showNews() {
          this.showNewsList = true
          this.showComment = false
          this.showPreviewList = false
          this.showUserDetail = false
          this.showChangePwd = false
        },
        showPreview() {
          this.showPreviewList = true
          this.showComment = false
          this.showNewsList = false
          this.showUserDetail = false
          this.showChangePwd = false
        },
        showCom() {
          this.showComment = true
          this.showPreviewList = false
          this.showNewsList = false
          this.showUserDetail = false
          this.showChangePwd = false
        },
        showUser() {
          this.showUserDetail = true
          this.showPreviewList = false
          this.showNewsList = false
          this.showComment = false
          this.showChangePwd = false
        },
        showChange() {
          this.showChangePwd = true
          this.showPreviewList = false
          this.showNewsList = false
          this.showComment = false
          this.showUserDetail = false
        }
    }
}
</script>

<style scoped>
  @import '/static/css/home.css'
</style>
