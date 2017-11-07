<template> 
  <div class="loading"> 
    <div class="loading" > 
      <div id="loaderImage"></div> 
    </div> 
  </div> 
</template> 
 
<script>
export default { 
  name: 'loading' 
} 
</script> 
 
<style scoped> 
   #loaderImage
{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 64px;
    height: 64px;
    margin: auto;

    background: url(../assets/loading.gif) no-repeat;
}

</style>