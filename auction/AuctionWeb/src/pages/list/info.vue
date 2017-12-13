<template>
	<div>
		<div class="info-wrap">
			<div class="info-body">
				<div class="info-body-top">
					<span class="info-body-top-content">最新消息</span>
				</div>
				<div class="info-body-list">
					<div class="info-body-list-block" v-for="item in infolist">
						<div class="list-block-left">
							<img class="left-img" src="../../../static/img/mi6.jpg" >
						</div>
						<div class="list-block-right">
							<h3><a class="block-right-title">{{ item.title }}</a></h3>
							<p class="block-right-description">{{ item.description }}</p>
							<div class="block-right-foot">
								<p>
									<span class="block-right-author">{{ item.author }}</span>
									<i>.</i>
									<span class="block-right-date">{{ item.date }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	components: {
	},
	data() {
		return {
			infolist: [
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			},
			{
				title: '实创装饰上海分公司负责人失联  “全屋整装”的模式究竟能不能走得通',
				description: '整装模式服务中暴露的种种问题，加上整个家装行业面临淘汰落后产能的转型压力，都在加剧实创装饰的经营与管理风险。',
				author: '杨秋月',
				date: '今天 14:00'
			}
			]
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped>
@import '/static/css/info.css'
</style>