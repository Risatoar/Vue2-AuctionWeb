<template>
    <div>
        <dialog id="dialog" ref="mybox">
            <h2>我是对话框标题</h2>
            <p>我是对话框内容</p>
        </dialog>
        <button @click="asdasd" class="btn btn-info"></button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                visible: false
            }
        },
        methods: {
            handleOpen () {
                this.visible = true;
            },
            handleClose () {
                this.visible = false;
            },
            asdasd() {
                this.$refs.mybox.style.display = 'block';
            }
        }
    }
</script>