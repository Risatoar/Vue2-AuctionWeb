<template>
	<div>
	</div>
</template>

<script>
export default {
	created() {
		this.redirect()
	},
	methods : {
		redirect() {
			this.$router.go(-1)
		}
	}
}
</script>

<style>

</style>