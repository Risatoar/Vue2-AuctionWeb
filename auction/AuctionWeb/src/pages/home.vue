<!--
    createdate: 2017/12/20
  author：risatoar
  mail：risatoar@163.com
-->


<template>
  <div>
    <div class="home">
      <div class="home-wrap">
        <div class="home-content">
          <div class="home-left">
            <Menu :theme="theme3" active-name="1" style="height:800px;">
                    <MenuGroup title="内容管理">
                        <MenuItem name="1" @click.native="showNews">
                            <Icon type="document-text"></Icon>
                            拍卖信息
                        </MenuItem>
                        <MenuItem name="2" @click.native="showPreview">
                            <Icon type="chatbubbles"></Icon>
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
                            找回密码
                        </MenuItem>
                    </MenuGroup>
                    <RadioGroup v-model="theme3" style="position: relative;margin:0 auto;color:#2d8cf0;margin-top:100px;">
                      <p>修改导航栏主题</p>
                      <br>
                      <Radio label="light">白</Radio>
                      <Radio label="dark">灰</Radio>
                    </RadioGroup>
                </Menu>
                <br>
          </div>
          <div class="home-middle">
            <newslist v-if="showNewsList"></newslist>
            <comment v-if="showComment"></comment>
            <previewlist v-if="showPreviewList"></previewlist>
            <userdetail v-if="showUserDetail"></userdetail>
            <changepwd v-if="showChangePwd"></changepwd>
          </div>
          <div class="home-right">
            <div class="home-usericon">
              <Card style="width:350px;">
                  <div style="text-align:center">
                      <img src="../../static/img/1.jpg" height="100" width="100" style="border-radius: 100px;border: 5px solid #dddee1;margin-bottom:10px;">
                      <h3>{{ username }}</h3>
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
              <p>您的个人信息完整度</p>
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
  </div>
</template>

<script>
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
         username: '',
         showComment: false,
         showNewsList: false,
         showPreviewList: false,
         showUserDetail: false,
         showChangePwd: false
      }
    },
    mounted() {
      this.getUsername()
    },
    methods: {
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
        getUsername () {
        this.username = this.getCookie("user")
        },
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
