<template>
	<div>
		<div class="slide">
			sadsads
		</div>
		<news></news>
		<touchRipple>
			<h1>it's a h1 title</h1>
			   <div>it's a div block</div>
		</touchRipple>
	</div>
</template>

<script>
    import news from '../components/news.vue'
    import { touchRipple } from 'vue-touch-ripple'
	export default {
		components: {
			news,
			touchRipple
		}
	}
</script>

<style>

</style>