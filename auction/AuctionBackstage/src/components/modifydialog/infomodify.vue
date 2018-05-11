<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself">x</p>
          <!-- 拍卖信息修改弹出层 -->
          <div class="modifyinfo">
          	<!-- 拍卖信息修改弹出层背景层 -->
          	<div class="modifyinfo-wrap">
          		<!-- 拍卖信息修改弹出层内容层 -->
          		<div class="modifyinfo-content">
          			<!-- 拍卖信息修改弹出层头部 -->
          			<div class="modifyinfo-content-head">
          				<!-- 拍卖信息修改弹出层头部标题 -->
          				<div class="modifyinfo-content-head-title">
          					修改拍卖知识
          				</div>
          				<!-- 拍卖信息修改弹出层头部发布按钮 -->
          				<button class="btn btn-info modifyinfo-btn" @click="modifyinfo">立即修改!</button>
          			</div>
          			<!-- 拍卖信息修改弹出层标题修改 -->
          			<div class="modifyinfo-content-addtitle">
          				<label>点击这里输入标题</label>
          				<input type="text" class="form-control input-title" label="点击这里输入标题" v-model="modifydata.title"></input>
          			</div>
          			<!-- 拍卖信息修改弹出层简介修改 -->
          			<div class="modifyinfo-content-adddescription">
          				<label>请输入简介</label>
          				<input type="text" class="form-control input-description" label="请输入简介" v-model="modifydata.description"></input>
          			</div>
          			<!-- 拍卖信息修改弹出层主要内容修改，富文本编辑器采用了vue-editor -->
          			<div class="modifyinfo-content-body">
          				<h3>请输入拍卖信息主要内容</h3>
          				<vue-editor v-model="modifydata.maintext"></vue-editor>
          				<!-- 主要内容信息预览区块，可以看到输入的内容在实际的样式 -->
          				<h2>预览</h2>
          				<div class="modifyinfo-content-preview">
          					<p v-html="modifydata.maintext" class="modifyinfo-content-preview-maintext"></p>
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
  name: 'infomodifydialog',
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
  // 通过axios封装的ajax操作来与后台进行异步post操作,修改拍卖公告
	modifyinfo() {
		axios.post("/knowledge/modify",this.modifydata).then((res)=> {
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

.modifyinfo {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.modifyinfo .modifyinfo-wrap {
  padding: 2em 0;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content {
  position: relative;
  border: 1px solid #c3cbd6;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-head-title {
  font-family: Main Head;
  font-size: 24px;
  padding: 15px 10px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-btn {
  font-family: Main Head;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-addtitle {
  padding: 15px 10px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-addtitle .input-title {
  width: 100%;
  text-align: center;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-adddescription {
  padding: 15px 10px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-adddescription .input-description {
  width: 100%;
  text-align: center;
  text-indent: 25px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-body {
  padding: 15px 10px;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content h3 {
  padding: 15px 0;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content h2 {
  padding: 30px 0 15px 0;
}

.modifyinfo .modifyinfo-wrap .modifyinfo-content .modifyinfo-content-preview {
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