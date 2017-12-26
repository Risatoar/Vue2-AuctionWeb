<template>
	<div class="addinfo">
		<div class="addinfo-wrap">
			<div class="addinfo-content">
				<div class="addinfo-content-head">
					<div class="addinfo-content-head-title">
						现在就来发布一则拍卖消息吧！
					</div>
					<button class="btn btn-info addinfo-btn" @click="addinfo">立即发布!</button>
				</div>
				<div class="addinfo-content-addtitle">
					<effect-input type="haruki" label="请输入标题" v-model="add.title" class="input-title"></effect-input>
				</div>
				<div class="addinfo-content-body">
					<vue-editor v-model="add.description"></vue-editor>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
	components: {
	   VueEditor
	},
	data() {
		return {
			add: {
				author: '',
				title: '',
				description: ''
			},
			username: ''
		}
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
        setAuthor() {
        	this.add.author = this.getCookie("user")
        },
		addinfo() {
			////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
			this.setAuthor()
			axios.post("/addinfo",this.add).then((res)=> {
				console.log(res);
			}).catch((error)=> {
				console.log(error);
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/addinfo.css'
</style>