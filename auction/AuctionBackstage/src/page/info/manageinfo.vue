<template>
	<section id="manageinfo">
		<div class="minfo-inner">
			<div class="title"><span>管理拍卖公告</span></div>
			<div class="info-list">
				<div>
			        <Table border :columns="columns7" :data="data6"></Table>
			        <Page
                    :total="total"
                    :page-size="16"
                    simple
                    :current.sync="pagecount"
                    @on-change="showPageCount"
                    ></Page>
			    </div>
			</div>
		</div>
	</section>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                total: 1,
                pagecount: 1,
                columns7: [
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
                        width: 150,
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
                data6: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '公告信息',
                    content: `作者：${this.data6[index].author}<br>标题：${this.data6[index].title}<br>发布日期：${this.data6[index].date}`
                })
            },
            remove (index) {
                let del = {
                    delid: this.data6[index]._id
                }
                axios.post("/info/del",del)
                .then(res=> {
                    this.data6.splice(index, 1);
                })
                .catch(err =>{
                })
            },
             // 获取拍卖预告总条数
            getPageCount() {
                axios.get("/infos/Count")
                .then(res=> {
                    this.total = res.data.result.count
                })
                .catch(err=> {
                    console.log(err)
                })
            },
            // 页码切换回调
            showPageCount() {
                this.getList();
            },
            getList() {
                this.getPageCount()
                let Post = {
                    pagecount: this.pagecount
                }
                axios.post("/infos/list",Post)
                .then(res=> {
                    this.data6 = res.data.result.list
                })
            },
        }
    }
</script>

<style scoped>
	#manageinfo {
		width: 100%;
		height: 100%;
	}

	.minfo-inner {
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

	.addinfo {
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
		background-color: rgba(235,238,245,.9);
	}


</style>