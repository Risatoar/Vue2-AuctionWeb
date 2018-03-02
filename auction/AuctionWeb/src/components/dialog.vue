<!--
弹出层组件
author：risatoar
date：null
-->
<template>
  <div class="dialog">
  <!-- 设置遮罩,点击触发弹出层隐藏事件 -->
  <div class="dialog-cover"  v-if="isShow" @click="close"></div>
  <!-- 弹出层隐藏及展示动画 -->
  <transition name="pass">
    <div class="dialog-content"  v-if="isShow">
      <p class="dialog-close" @click="close">x</p>
      <slot></slot>
    </div>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'dialogBox',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    auctioninfo: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.pass-enter-active {
  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
.pass-leave-active {
  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
.pass-enter {
  -webkit-transform: translateX(-500px);
      -ms-transform: translateX(-500px);
          transform: translateX(-500px);
}
.pass-leave-active {
  -webkit-transform: translateY(-500px);
      -ms-transform: translateY(-500px);
          transform: translateY(-500px);
}

.dialog {
  display: inline-block;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.dialog-cover {
  background: #000;
  opacity: .1;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 40%;
  display: inline-block;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -20%;
  z-index: 999;
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
p{
  text-align: center;
}
</style>
