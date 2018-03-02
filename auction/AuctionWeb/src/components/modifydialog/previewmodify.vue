<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself">x</p>
          <!-- 拍卖预告信息添加界面 -->
          <div class="modifypreview">
            <!-- 拍卖预告信息添加界面背景层 -->
            <div class="modifypreview-wrap">
              <!-- 拍卖预告信息添加界面内容层 -->
              <div class="modifypreview-content">
                <!-- 拍卖预告信息添加界面头部 -->
                <div class="modifypreview-content-head">
                  <!-- 拍卖预告信息添加界面头部标题 -->
                  <div class="modifypreview-content-head-title">
                    现在就来发布一则拍卖消息吧！
                  </div>
                  <!-- 拍卖预告信息添加界面头部发布按钮 -->
                  <button class="btn btn-info modifypreview-btn" @click="modifypreview">立即修改!</button>
                </div>
                <!-- 拍卖预告信息添加界面标题添加 -->
                <div class="modifypreview-content-addtitle">
                  <label>点击这里输入标题</label>
                  <input type="text" class="form-control input-title" label="点击这里输入标题" v-model="modifydata.title"></input>
                </div>
                <!-- 拍卖预告信息添加界面简介添加 -->
                <div class="modifypreview-content-adddescription">
                  <label>请输入简介</label>
                  <input type="text" class="form-control input-description" label="请输入简介" v-model="modifydata.description"></input>
                </div>
                <!-- 拍卖预告信息添加界面价格添加 -->
                <div class="modifypreview-content-addsaleprice">
                  <label>请输入价格</label>
                  <input type="text" class="form-control input-saleprice" label="请输入价格" v-model="modifydata.saleprice"></input>
                </div>
                <!-- 图片上传 -->
                <div style="padding: 20px 10px;width:300px;">
                  <Upload
                      multiple
                      type="drag"
                      action="/uploads"
                      :on-success="handleSuccess"
                      >
                      <div>
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>添加封面图片</p>
                      </div>
                  </Upload>
                </div>
                <!-- 拍卖预告信息添加界面时间选择区块，采用了iview的datepicker和timepicker组件 -->
                <div class="timepicker">
                  <span class="timepicker-title">请在这里选择拍卖开始及结束时间</span>
                  <!-- 通过datepicker选择拍卖预告开始及结束日期 -->
                  <div class="timepicker-date">
                    <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" format="yyyy-MM-dd" @on-change="modifydata.setdate=$event">
                    </Date-picker>
                  </div>
                        </br>
                        <span class="timepicker-title">选择拍卖结束具体时间</span>
                        <!-- 通过datepicker选择拍卖预告具体结束时间 -->
                        <div class="timepicker-date">
                    <Time-picker type="time" placeholder="选择时间" style="width: 168px" @on-change="timess=$event"></Time-picker>
                  </div>
                </div>
                <div class="modifypreview-content-body">
                  <h3>请输入拍卖信息主要内容</h3>
                  <!-- 拍卖预告添加界面主要内容添加，富文本编辑器采用了vue-editor -->
                  <vue-editor v-model="modifydata.maintext"></vue-editor>
                  <h2>预览</h2>
                  <!-- 主要内容信息预览区块，可以看到输入的内容在实际界面的样式 -->
                  <div class="modifypreview-content-preview">
                    <p v-html="modifydata.maintext" class="modifypreview-content-preview-maintext"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'previewmodifydialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    modifydata: {
      type: Object,
      default: []
    }
  },
  components: {
     VueEditor
  },
  data() {
  	return {
      timess: '',
  		username: '',
  		visible: false,
  	}
  },
  mounted() {
  	this.gotop()
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    },
	gotop() {
		window.scrollTo(0,0)
	},
	success () {
    	this.$Message.success('发送成功');
    },
  // 图片上传成功回调
  handleSuccess (res, file) {
  	console.log(res)
      this.modifydata.covermap = res.originalname;
  },
  pushTime() {
    this.modifydata.setdate.push(this.timess)
  },
  // 通过axios封装的ajax操作来与后台进行异步post操作,修改拍卖公告
	modifypreview() {
    this.pushTime()
		axios.post("/previewdetail/modify",this.modifydata).then((res)=> {
			console.log(res);
			if(res.status == '200'){
				this.success()
			}
		}).catch((error)=> {
			console.log(error);
		});
	}
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 50%;
  position: fixed;
  max-height: 90%;
  overflow: auto;
  background: #fff;
  top: 5%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  padding: 2%;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}

.modifypreview {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.modifypreview .modifypreview-wrap {
  padding: 2em 0;
}

.modifypreview .modifypreview-wrap .modifypreview-content {
  position: relative;
  border: 1px solid #c3cbd6;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-head-title {
  font-family: Main Head;
  font-size: 24px;
  padding: 15px 10px;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-btn {
  font-family: Main Head;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-addtitle {
  padding: 15px 10px;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-addtitle .input-title {
  width: 100%;
  text-align: center;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-adddescription {
  padding: 15px 10px;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-adddescription .input-description {
  width: 100%;
  text-align: center;
  text-indent: 25px;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-body {
  padding: 15px 10px;
}

.modifypreview .modifypreview-wrap .modifypreview-content h3 {
  padding: 15px 0;
}

.modifypreview .modifypreview-wrap .modifypreview-content h2 {
  padding: 30px 0 15px 0;
}

.modifypreview .modifypreview-wrap .modifypreview-content .modifypreview-content-preview {
  font-family: Text;
  line-height: 2;
  height: 100%;
  min-height: 200px;
  padding: 15px 10px;
  text-indent: 25px;
  color: #657180;
  border: 1px solid #c3cbd6;
}
</style>