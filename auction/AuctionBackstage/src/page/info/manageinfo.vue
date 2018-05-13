<style>
    .checkitem {
        font-weight: bolder;
        font-size: 16px;
        margin-bottom: 6px;
    }

    .checkwarn {
        margin-bottom: 6px;
        color: red;
    }
</style>

<template>
	<section id="manageinfo">
		<div class="minfo-inner">
            <Modal
                v-model="modal1"
                title="拍卖公告审核"
                @on-ok="onCheck">
                <CheckboxGroup v-model="checkbox">
                    <div class="checkitem">审核项(请打开对应项的查看按钮进行审查)</div>
                    <span class="checkwarn">以下内容请在48小时内仔细审核,全部确认通过后审核才能通过</span><br>
                    <Checkbox label="title">标题</Checkbox><br>
                    <Checkbox label="dec">详细描述</Checkbox><br>
                    <Checkbox label="img">封面</Checkbox><br>
                    <Checkbox label="maintext">主要内容</Checkbox><br>
                </CheckboxGroup>
                <br>
                <div class="banAuthor">
                    <Collapse>
                            <Panel name="1">
                                拍卖公告审查注意事项
                                <p slot="content">针对四个审查点进行审查,审查通过对对应审查项打钩,对内容轻微不合法的信息拨打电话通知对应用户通知修改,对内容严重违规的信息可直接删除,并封禁相应用户</p>
                            </Panel>
                            <Panel name="2">
                                违规操作
                                <div slot="content">
                                    对用户违规操作进行相应操作。
                                    <Collapse accordion>
                                        <Panel name="1-1">
                                            通知用户
                                            <p slot="content">作者联系方式: 13905860879</p>
                                        </Panel>
                                        <Panel name="1-2">
                                            封禁用户
                                            <p slot="content">
                                                <Button type="error" @click.native="banUser()">封禁</Button>
                                                内容如果严重违规,可以封禁该用户
                                            </p>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </Panel>
                        </Collapse>
                </div>
            </Modal>
			<div class="title"><span>管理拍卖公告</span></div>
            <div style="position: absolute; right: 16px;">
                <Checkbox label="male" @click.native="showUnChecked()">只看未审核</Checkbox>
            </div>
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
                uncheck: false,
                allcheck: [],
                checkbox: [],
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
                        title: '审核(true-已审核,false-未审核)',
                        key: 'isChecked'
                    },
                    {
                        title: '发布日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
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
                                            this.showCheck(params.index)
                                        }
                                    }
                                }, '审核'),
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
                data6: [],
                data2: [],
                modal1: false,
                now: 0,
                nowindex: 0,
                postcheck: {
                    _id: ''
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            show (index) {
                window.location.href = "http://localhost:81/detail/info/" + this.data6[index]._id
            },
            showCheck(index) {
                let oldindex = this.nowindex
                this.nowindex = this.data6[index]._id
                this.modal1 = true
                if(this.nowindex != oldindex) {
                    this.checkbox = this.allcheck[index]
                }
                this.now = index
            },
            onCheck() {
                if(this.checkbox == undefined || this.checkbox.length == 0) {
                    this.$Message.warning('请再次确定审核项');
                } else if(this.checkbox.length<4) {
                    this.allcheck[this.now] = this.checkbox
                    console.log(this.allcheck[this.now])
                } else {
                    this.postcheck._id = this.data6[this.now]._id
                    axios.post("infos/check",this.postcheck).then(res => {
                        console.log(res)
                    })
                }
            },
            banUser() {
                let nowindex = this.now
                let band = {
                    username: this.data6[nowindex].author
                }
                console.log(band)
                if(band.username != 'risatoar') {
                    axios.post("/users/ban",band).then((res)=> {
                        if(res.data.status == 1001){
                            this.error(`用户：${this.data6[this.now].author} 已被封禁`)
                        }
                    }).catch((error)=> {
                      console.log(error);
                    });
                } else {
                    this.error("无法对管理员用户进行此操作")
                }
            },
            success (msg) {
                this.$Message.success(msg);
            },
            warning (msg) {
                this.$Message.warning(msg);
            },
            error (msg) {
                this.$Message.error(msg);
            },
            remove (index) {
                let del = {
                    delid: this.data6[index]._id
                }
                axios.post("/infos/del",del)
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
            showUnChecked() {
                this.uncheck = !this.uncheck;
                let data = this.data6.filter(function(index) {
                    return index.isChecked == false;
                });
                this.data6 = this.uncheck == true ? data : this.data2
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
                    this.data2 = res.data.result.list
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
        position: relative;
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