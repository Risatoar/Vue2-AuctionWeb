<template>
	<section id="mangeuser">
		<div class="muser-inner">
			<div class="title"><span>管理用户</span></div>
			<div class="adduser">
				<router-link to="/adduser">
				<Button type="info">添加用户</Button>
				</router-link>
			</div>
			<div class="user-list">
				<div>
			        <Table border :columns="columns" :data="data2"></Table>
			        <Page :current="1" :total="50" simple></Page>
			    </div>
			</div>
		</div>
        <Modal
            v-model="modal6"
            title= "实名认证"
            :loading="loading"
            @on-ok="asyncOK">
            <div class="idCard">
                <h1 style="color: orange;margin-bottom: 12px;text-align: center">显示该用户上传的身份证正反面</h1>
                <h2 style="color: green; margin-bottom: 12px">身份证反面</h2>
                <img :src="img1" style="width:500px; height:300px;" alt="">
                <h2 style="color: green; margin-bottom: 12px; margin-top: 12px">身份证正面</h2>
                <img :src="img1" style="width:500px; height:300px;" alt="">
            </div>
        </Modal>
         <Modal
             v-model="modal1">
             <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>申请解封</span>
            </p>
            <div style="text-align:center;font-size:16px">
                解封理由
                 <p>
                    {{ nowuser.reason }}
                </p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="modal_loading" @click="onUnBan">解封</Button>
            </div>
         </Modal>
	</section>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                modal6: false,
                modal1: false,
                modal_loading: false,
                loading: true,
                img1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526740489&di=8eeceec6f3ee07b912b1f18b0425f565&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg',
                idcard1: '',
                idcard2: '',
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
                        key: 'usercreatedate'
                    },
                    {
                        title: '真实姓名',
                        key: 'truename'
                    },
                    {
                        title: '公司/个人',
                        key: 'company'
                    },
                    {
                        title: '实名认证(true-已认证,false-未认证)',
                        key: 'isReal'
                    },
                    {
                        title: '封禁状态(true-封禁,false-未封禁)',
                        key: 'isBan'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.Ban(params.index)
                                        }
                                    }
                                }, '封禁'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.unBan(params.index)
                                        }
                                    }
                                }, '解封'),
                                h('Button', {
                                    props: {
                                        type: 'success',
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
                                }, '认证'),
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
                data2: [],
                nowuser: {},
                nowindex: ''
            }
        },
        mounted() {
            this.getUserList()
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `用户名：${this.data2[index].username}<br>创建日期：${this.data2[index].usercreatedate}<br>真实姓名：${this.data2[index].truename}<br>公司信息：${this.data2[index].company}<br>年龄：${this.data2[index].age}<br>电话号码：${this.data2[index].telephone}<br>邮箱：${this.data2[index].mail}`
                })
            },
            Ban (index) {
                let band = {
                    username: this.data2[index].username,
                    userid: this.data2[index]._id
                }
                if(this.data2[index].admin == false) {
                    axios.post("/users/ban",band).then((res)=> {
                        if(res.data.status == 1001){
                            this.error(`用户：${this.data2[index].username} 已被封禁`)
                        }
                    }).catch((error)=> {
                      console.log(error);
                    });
                } else this.error("无法对管理员用户进行此操作")
            },
            unBan (index) {
                this.modal1 = true;
                this.nowindex = index;
                this.nowuser = this.data2[index]
                // let band = {
                //     username: this.data2[index].username,
                //     userid: this.data2[index]._id
                // }
                // if(this.data2[index].admin == false) {
                //     axios.post("/users/unban",band).then((res)=> {
                //         if(res.data.status == 1001){
                //             this.success('解封成功')
                //         }
                //     }).catch((error)=> {
                //       console.log(error);
                //     });
                // } else this.error("无法对管理员用户进行此操作")
            },
            onUnBan() {
                let band = {
                    username: this.nowuser.username,
                    userid: this.nowuser._id
                }
                if(this.nowuser.admin == false) {
                    axios.post("/users/unban",band).then((res)=> {
                        if(res.data.status == 1001){
                            this.success('解封成功')
                        }
                    }).catch((error)=> {
                      console.log(error);
                    });
                } else this.error("无法对管理员用户进行此操作")
            },
            remove (index) {
                let del = {
                    delid: this.data2[index]._id
                }
                if(this.data2[index].admin == false) {
                    axios.post("/users/del",del)
                    .then(res=> {
                        this.data2.splice(index, 1);
                    })
                    .catch(err =>{
                    })
                } else this.error("无法对管理员用户进行此操作")
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
            showCheck(index) {
                this.nowindex = index;
                if(this.data2[index].admin == false) {
                    this.modal6 = true;
                    this.idcard1 = this.data2[index].idCard1;
                    this.idcard2 = this.data2[index].idCard2;
                    this.img1 = this.data2[index].idCard1 == ""? "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2432627180,1502188527&fm=27&gp=0.jpg" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526740489&di=8eeceec6f3ee07b912b1f18b0425f565&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg"
                } else this.error("无法对管理员用户进行此操作")
            },
            asyncOK () {
                let band = {
                    username: this.data2[this.nowindex].username,
                    userid: this.data2[this.nowindex]._id
                }
                setTimeout(() => {
                    axios.post("/users/check",band).then((res)=> {
                        if(res.data.status == 1001){
                            this.success(`用户：${this.data2[this.nowindex].username} 实名认证成功`)
                        }
                    }).catch((error)=> {
                      console.log(error);
                    });
                    this.modal6 = false;
                }, 2000);
            },
            getUserList() {
                axios.get("/users")
                .then(res=> {
                    this.data2 = res.data.result.list
                })
                .catch(err=> {
                    console.log(err)
                })
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