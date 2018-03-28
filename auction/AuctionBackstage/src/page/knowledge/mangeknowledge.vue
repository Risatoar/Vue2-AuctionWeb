<template>
	<section id="mangeknowledge">
		<div class="mknow-inner">
			<div class="title"><span>管理拍卖知识</span></div>
			<div class="addknowledge">
				<router-link to="/addknowledge">
				<Button type="info">添加拍卖公告</Button>
				</router-link>
			</div>
			<div class="knowledge-list">
				<div>
			        <Table border :columns="columns" :data="data2"></Table>
			        <Page :current="1" :total="50" simple></Page>
			    </div>
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '作者',
                        key: 'author',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.author)
                            ]);
                        }
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '发布日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data2: [
                    {
                        author: 'John Brown',
                        title: 18,
                        date: 'New York No. 1 Lake Park'
                    },
                    {
                        author: 'Jim Green',
                        title: 24,
                        date: 'London No. 1 Lake Park'
                    },
                    {
                        author: 'Joe Black',
                        title: 30,
                        date: 'Sydney No. 1 Lake Park'
                    },
                    {
                        author: 'Jon Snow',
                        title: 26,
                        date: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '公告信息',
                    content: `作者：${this.data2[index].author}<br>标题：${this.data2[index].title}<br>发布日期：${this.data2[index].date}`
                })
            },
            remove (index) {
                this.data2.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
	#mangeknowledge {
		width: 100%;
		height: 100%;
	}

	.mknow-inner {
		width: 100%;
		height: 100%;
		background-color: #fff;
		font-size: 16px;
		display: flex;
		flex-flow: column wrap;
		justify-content: flex-start;
	}

	.title {
		font-weight: 550;
		color: #000;
		font-size: 20px;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}

	.title::before {
		content: ".";
		width: 3px;
		height: 20px;
		background-color: #000;
		margin-right: 10px;
	}

	.addknowledge {
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
		background-color: rgba(235,238,245,.9);
	}


</style>