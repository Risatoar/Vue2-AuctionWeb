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
          <Modal
              v-model="modal1"
              width="1024"
              title="实名认证">
              <p style="text-align: left;font-size: 14px; color: red"><strong>请上传与您个人信息中真实姓名相符合的身份证信息</strong></p>
              <Steps :current="process1">
                      <Step title="身份证正面" content="上传身份证正面图片"></Step>
                      <Step title="身份证反面" content="上传身份证反面图片"></Step>
                      <Step title="确认身份信息" content="确认上传的身份证照片为本人真实信息"></Step>
                      <Step title="上传" content="上传实名认证信息"></Step>
              </Steps>
              <br>
              <Tabs value="name1">
                  <TabPane label="身份证正面" name="name1">
                    <div style="padding: 20px 10px;width:300px;">
                      <Upload
                          type="drag"
                          action="/uploads"
                          :on-success="handleSuccess"
                          >
                          <div>
                              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                              <p>添加身份证正面</p>
                          </div>
                      </Upload>
                    </div>
                  </TabPane>
                  <TabPane label="身份证反面" name="name2">
                    <div style="padding: 20px 10px;width:300px;">
                      <Upload
                          type="drag"
                          action="/uploads"
                          :on-success="handleSuccess1"
                          >
                          <div>
                              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                              <p>添加身份证反面</p>
                          </div>
                      </Upload>
                    </div>
                  </TabPane>
              </Tabs>
              <br>
              <Button type="warning" style="margin: 0 10px" @click.native="CheckInfo()">确认信息</Button> <Button type="success" style="margin: 0 10px" @click.native="onHandleCheck()">提交认证</Button>
          </Modal>
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
          <newslist v-if="showNewsList" :userd="userdetails" @get-user-info-count="checkCount"></newslist>
          <comment v-if="showComment"></comment>
          <previewlist v-if="showPreviewList" :userd="userdetails"></previewlist>
          <userdetail v-if="showUserDetail" :userd="userdetails" @on-change="reFresh"></userdetail>
          <changepwd v-if="showChangePwd"></changepwd>
        </div>
        <!-- 个人主页右侧,展示个人头像、昵称、发布过的信息数、个人信息完整度、消息列表 -->
        <div class="home-right">
          <div class="home-usericon">
            <Card style="width:350px;position: relative;">
                <Button v-if="userdetails.isReal == false" @click.native="checkReal()" type="error" style="position: absolute; top: 12px; right: 10px">实名认证</Button>
                <div style="text-align:center">
                    <img v-lazy="'/static/img/uploads/' + userdetails.icon" height="100" width="100" style="border-radius: 100px;border: 5px solid #dddee1;margin-bottom:10px;">
                    <h3>{{ userdetails.nickname }}</h3>
                </div>
            </Card>
          </div>
          <div class="home-userdetail">
            <Card style="width:350px;">
                <p slot="title">至今为止</p>
                <p>您已经在本网站发布过{{ userinfocount }}条拍卖信息</p>
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
         process1: 0,
         percent: 60,
         user: {
          username: ''
         },
         modal1: false,
         userinfocount: 0,
         userdetails: [],
         totle: 6,
         showComment: false,
         showNewsList: false,
         showPreviewList: false,
         showUserDetail: false,
         showChangePwd: false,
         real: {
          img1: '',
          img2: '',
          checked: false,
          isUp: false
         },
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
      this.checkCount()
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
            let _detail = res.data.result.list;
            this.userdetails = _detail;
            this.userdetails.icon = _detail.icon == 'no'?'16.jpg':_detail.icon;
            this.refreshcircle()
          })
        },
        // 图片上传成功回调
        handleSuccess (res, file) {
          this.real.img1 = res.originalname;
          this.userdetails.idCard1 = res.originalname;
          this.success('上传身份证正面图片成功')
          this.CheckProcess()
          axios.post("/edit/idcard1",this.userdetails).then((res)=> {
            console.log(res);
            if(res.status == '1001'){
              this.success('上传身份证正面图片成功')
              this.CheckProcess()
            }
          }).catch((error)=> {
            console.log(error);
          });
        },
        CheckInfo() {
          this.real.checked = true
          this.process1 = 3
        },
        CheckProcess() {
          console.log(1)
          if(this.real.img1 != '') {
            this.process1 = 1
          } else if(this.real.img2 != '') {
            this.process1 = 2
          } else if(this.real.checked == true) {
            this.process1 = 3
          } else if(this.real.isUp == true) {
            this.process1 = 4
          } else this.process1 = 0
        },
        // 图片上传成功回调
        handleSuccess1 (res, file) {
          if(this.real.img1 === '') {
            this.warning('请先上传身份证正面')
          } else {
            this.process1 = 2
            this.real.img2 = res.originalname;
            this.userdetails.idCard2 = res.originalname;
            this.success('上传身份证正面图片成功')
            axios.post("/edit/idcard2",this.userdetails).then((res)=> {
              if(res.status == '1001'){
                this.success('上传身份证正面图片成功')
              }
            }).catch((error)=> {
              console.log(error);
            });
          }
        },
        onHandleCheck() {
          setTimeout(() => {
              this.success('上传成功')
              this.process1 = 4
          }, 2000);
        },
        // 计算个人信息完整度
        refreshcircle() {
          let user = this.userdetails
          let percentForm = {
            age : user.age,
            nickname : user.nickname,
            truename : user.truename,
          }
          let keys = Object.keys(percentForm)
          let totle = []
          for(let i = 0; i<keys.length; i++) {
            if(percentForm[keys[i]] !== '') {
              totle.push(percentForm[keys[i]])
            }
          }
          this.percent = Math.floor((totle.length + 4)/7*100)
          this.success()
        },
        reFresh() {
          this.refreshcircle()
        },
        checkReal() {
          if(this.percent != 100) {
            this.warning('您的个人信息完整度不完整(完整度到达100%),请在用户信息页面补全您的信息')
          } else this.modal1 = true
        },
        success (msg) {
            this.$Message.success(msg);
        },
        warning (msg) {
            this.$Message.warning(msg);
        },
        error (msg) {
            this.$Message.error(msg);
        },
        checkCount(countNum) {
          this.userinfocount = countNum;
        },
        success () {
          this.$Message.success('刷新成功');
        },
        postChange(attr) {
          axios.post("/edit/" + attr,this.userd).then((res)=> {
              if(res.data.status == 1001){
                  this.success('修改成功')
              }else if(res.data.status == 1002){
                  this.error('修改失败,密码错误')
              }else if(res.data.status == 1003){
                this.warning('数据没有修改过')
              }
              this.$emit('on-change')
          }).catch((error)=> {
            console.log(error);
          });
        },
        // setTimeoutRef() {
        //   let _this = this
        //   setTimeout(_this.refrshcircle(),100)
        // },
        initShow () {
          this.showNewsList = false
          this.showComment = false
          this.showPreviewList = false
          this.showUserDetail = false
          this.showChangePwd = false
        },
        showNews() {
          this.initShow()
          this.showNewsList = true
        },
        showPreview() {
          this.initShow()
          this.showPreviewList = true
        },
        showCom() {
          this.initShow()
          this.showComment = true
        },
        showUser() {
          this.initShow()
          this.showUserDetail = true
        },
        showChange() {
          this.initShow()
          this.showChangePwd = true
        }
    }
}
</script>

<style scoped>
  @import '/static/css/home.css'
</style>
