<template>
	<div>
		<div class="particles">
			<particles></particles>
		</div>
		<news></news>
	</div>
</template>

<script>
import news from '../components/news.vue'
import particles from '../components/particles.vue'
export default {
	components: {
		news,
		particles
	}
}
</script>

<style scoped>
.particles{
	z-index: 0;
}
</style>