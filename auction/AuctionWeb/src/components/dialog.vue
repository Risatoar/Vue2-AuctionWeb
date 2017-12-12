<template>
  <div>
    <div class="dialog">
      <div class="dialog-cover"  v-if="isShow" @click="close"></div>
      <transition name="pass">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="close">x</p>
          <slot></slot>
        </div>
      </transition>
    </div>
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
  transition: all .5s ease;
}
.pass-leave-active {
  transition: all .5s ease;
}
.pass-enter {
  transform: translateX(-500px);
}
.pass-leave-active {
  transform: translateY(-500px);
}

.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .1;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 40%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -20%;
  z-index: 10;
  padding: 2%;
  line-height: 1.6;
  background-color: #000;
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

</style>
