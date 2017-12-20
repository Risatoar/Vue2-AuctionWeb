<template>
  <div class="test">
    <row>
        拍卖开始结束日期
        <i-col span="12">
            <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" format="yyyy-MM-dd" @on-change="date=$event"></Date-picker>{{ date[0] }}  {{ date[1] }}
        </i-col>
    </row>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            date: ''
          }
        }
    }
</script>

<style scoped>
  .test{
    margin-top: 150px;
  }
</style>