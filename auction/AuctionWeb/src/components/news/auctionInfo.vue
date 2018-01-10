<!--
随机选择9条消息列表组件
author：risatoar
date：null
-->
<template>
  <div>
    <div class="auctioninfo">
      <!-- 消息列表组件,随机筛选9条数据进行展示 -->
      <Card style="width:350px;height:320px;">
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              消息列表
          </p>
          <!-- 点击触发随机筛选函数  -->
          <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>刷新
          </a>
          <!-- 消息及评分展示列  -->
          <ul>
              <li v-for="item in randomInfoList" style="width:320px;float:left;padding-bottom:14px;">
	          <router-link  :to="{path: '/detail/info/' + item._id}">
	             <a style="float:left;text-align:left;" class="infotitle">{{ item.title }}</a>
	          </router-link>
              <div style="float:right;">
                <!-- 根据评分来显示星星数 -->
                  <Icon type="ios-star" v-for="n in 4" :key="n" style="color:#f5a623"></Icon><Icon type="ios-star" v-if="item.stars >= 4.5" style="color:#f5a623"></Icon><Icon type="ios-star-half" v-else style="color:#f5a623"></Icon>
                  {{ item.stars }}
              </div>
              </li>
          </ul>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import newsdialog from '../dialog.vue'
export default {

	components: {
		newsdialog
	},

	data() {
		return {
			isShowAboutDialog: false,
			auctioninfo: [],
			showinfo: true,
			shownews: true,
			auction: {
				acTitle: '',
				acTime: ''
			},
			infoList: [],
			randomInfoList: []
		}
	},

	mounted() {
    this.getAuctionInfo();
	},

	methods: {
      // 随机筛选9条数据进行展示
      changeLimit () {
        function getArrayItems(arr, num) {
            const temp_array = [];
            for (let index in arr) {
                temp_array.push(arr[index]);
            }
            const return_array = [];
            for (let i = 0; i<num; i++) {
                if (temp_array.length>0) {
                    const arrIndex = Math.floor(Math.random()*temp_array.length);
                    return_array[i] = temp_array[arrIndex];
                    temp_array.splice(arrIndex, 1);
                } else {
                    break;
                }
            }
            return return_array;
        }
        this.randomInfoList = getArrayItems(this.infoList, 9);
      },
			// morenews() {
			// 	this.isShowAboutDialog = true;
			// },


      // 用get方法来获取数据库中消息列表
			getAuctionInfo() {
				axios.get("/information").then((result)=>{
					let res = result.data;
					this.infoList = res.result.list;
					this.changeLimit();
				});
			}
	}
}
</script>

<style scoped>
@import '/static/css/auctioninfo.css'
</style>