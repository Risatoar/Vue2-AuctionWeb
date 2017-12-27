<template>
	<div class="particles">
	<vue-particles
	    color="#2d8cf0"
	    :particleOpacity="0.7"
	    :particlesNumber="50"
	    shapeType="star"
	    :particleSize="4"
	    linesColor="#5cadff"
	    :linesWidth="1"
	    :lineLinked="true"
	    :lineOpacity="0.4"
	    :linesDistance="150"
	    :moveSpeed="3"
	    :hoverEffect="true"
	    hoverMode="grab"
	    :clickEffect="true"
	    clickMode="repulse"
	   >
	   </vue-particles>
	   <!-- "circle","edge","triangle", "polygon","star"。 -->
	</div>
</template>


<script>
export default {
}
</script>


<style scoped>

.particles{
    position: fixed;
    width: 100%;
    height: 100%;
    display: block;
/*    background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513836125013&di=8b8531b874b5ad814e656111af01a0cc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Db6b66788e324b899ca31717b066f77e0%2Fa8014c086e061d9594f57ab071f40ad163d9ca83.jpg);*/
}
</style>