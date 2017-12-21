<template>
	<div class="home-userdetail">
		<li>{{ userd.username }}</li>
		<li>{{ userd.nickname }}</li>
		<li>{{ userd.age }}</li>
		<li>{{ userd.truename }}</li>
		<li>{{ userd.company }}</li>
		<li>{{ userd.telephone }}</li>
		<li>{{ userd.icon }}</li>
		<li>{{ userd.mail }}</li>
	</div>
</template>

<script>
export default {
	props: {
	  userd: {
	    type: Array
	  }
	}
}
</script>

<style>

</style>