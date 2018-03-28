<template>
	<section id="mangeuser">
		<div class="muser-inner">
			<div class="title"><span>管理用户</span></div>
			<div class="adduser">
				<router-link to="/adduser">
				<Button type="info">添加拍卖公告</Button>
				</router-link>
			</div>
			<div class="user-list">
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
                        title: '用户名',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '创建日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                        username: 'John Brown',
                        date: 'New York No. 1 Lake Park'
                    },
                    {
                        username: 'Jim Green',
                        date: 'London No. 1 Lake Park'
                    },
                    {
                        username: 'Joe Black',
                        date: 'Sydney No. 1 Lake Park'
                    },
                    {
                        username: 'Jon Snow',
                        date: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '公告信息',
                    content: `用户名：${this.data2[index].username}<br>创建日期${this.data2[index].date}`
                })
            },
            remove (index) {
                this.data2.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
	#mangeuser {
		width: 100%;
		height: 100%;
	}

	.muser-inner {
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

	.adduser {
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
		background-color: rgba(235,238,245,.9);
	}


</style>