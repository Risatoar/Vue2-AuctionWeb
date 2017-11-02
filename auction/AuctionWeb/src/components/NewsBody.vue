<template>
	<table id="NewsBody" cellspacing="3px">
		<tr v-for="(item,index) in lists">
			<td> {{ index+1 }} </td>
			<td> {{ item.title }} </td>
			<td> {{ item.description }} </td>
			<td> {{ item.date }} </td>
			<button @click="deletelist">delete</button>
		</tr>
		<button @click="addlist">add</button>
	</table>
</template>

<script>
	export default{
		name: 'NewsBody',
		data() {
			return {
				lists:[
				{
					title: 'news1',
					description: '原价200块，现在通通20块。',
					date: '2017/11/1'
				},
				{
					title: 'news2',
					description: '原价200块，现在通通20块。',
					date: '2017/11/2'
				},
				{
					title: 'news3',
					description: '原价200块，现在通通20块。',
					date: '2017/11/3'
				},
				{
					title: 'news4',
					description: '原价200块，现在通通20块。',
					date: '2017/11/4'
				},
				{
					title: 'news5',
					description: '原价200块，现在通通20块。',
					date: '2017/11/5'
				}]
			}
		},
		methods: {
			addlist() {
				this.lists.push({
					title: 'newsx',
					description : '11111',
					date: '2017'
				})
			},
			deletelist(index) {
				this.lists.splice(index,1)
			}
		}
	}
</script>

<style>
	#NewsBody{
		margin: 0 auto;
		width: 1000px;
	}
	#NewsBody tr{
		background-color: #fff
	}
</style>