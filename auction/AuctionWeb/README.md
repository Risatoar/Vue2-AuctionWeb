## 源码目录介绍
```
./server                                   // 后端文件
├── bin
│   └── sprite.js                          // 后端文件入口文件
├── models
│   ├── auction.js                         // 拍卖公告模型文件
│   ├── info.js                            // 拍卖消息模型文件
│   ├── previews.js                        // 拍卖预告模型文件
│   └── users.js                           // 用户模型文件
├── public                                 // 通用文件夹
│   └── stylesheets                        // css样式文件夹
│   	└── style.css                      // 后端css样式
├── routes                                 // 路由文件夹
│   ├── auctioninfo.js                     // 拍卖公告路由及api集合文件
│   ├── index.js                           // 后端主页文件
│   ├── info.js                            // 拍卖消息路由及api集合文件
│   ├── previews.js                        // 拍卖预告路由及api集合文件
│   └── users.js                           // 用户路由及api集合文件
├── views                                  // jade文件夹
│   ├── error.jade                         // 出错模板
│   ├── index.jade                         // 主页模板
│   └── layout.jade                        // layout模板
├── app.js                                 // 通过express控制后端逻辑
└── package.json                           // package.json

./src                                      // 前端文件
├── assets                                 // 前端静态资源文件
│   ├── css                         	   // 系统静态css文件夹
│   ├── images                             // 系统图片文件夹
│   └── javascript                         // 静态js文件夹(暂未使用)
├── components                             // 前端组件文件夹
│   ├── news                         	   // 主页拍卖最新消息展示
│   	├── auctionInfo.vue                // 主页左侧拍卖公告信息展示
|       └── hotnews.vue                    // 主页右侧拍卖公告信息展示
│   ├── user                               // 用户登录注册组件
│   	├── login.vue                	   // 登录组件
|       └── register.vue                   // 注册组件
│   ├── dialog.vue                         // 弹出框组件
│   ├── layout.vue                         // 全局页面框架
│   ├── LoadingPage.vue                    // 全局loading组件
│   ├── news.vue                           // 主页新闻组件
│   ├── slideShow.vue                      // 幻灯片组件
│   └── test.vue                           // 测试页面组件
├── pages                                  // 页面组件
│   ├── detailpage                         // 子页面组件文件夹
│   	├── addinfo.vue                    // 添加拍卖公告组件
│   	├── addpreview.vue                 // 添加拍卖预告组件
│   	├── infodetail.vue                 // 拍卖公告详细页组件
│   	└── previewdetail.vue              // 拍卖预告详细页组件
│   ├── home                               // 用户个人中心组件文件夹
│   	├── changepwd.vue                  // 更改密码组件
│   	├── comment.vue                    // 评论统计组件
│   	├── newslist.vue                   // 拍卖公告发布统计组件
│   	├── previewlist.vue                // 拍卖预告发布统计组件
│   	└── userdetail.vue                 // 用户详细信息组件
│   ├── list                               // 分项页面组件(分为左侧分项类名组件及右侧消息列表)
│   ├── detail.vue                         // 分项页面
│   ├── home.vue                           // 用户个人中心
│   └── index.vue                          // 主页页面
├── routes                                 // 路由文件夹
│   ├── auctioninfo.js                     // 拍卖公告路由及api集合文件
│   ├── index.js                           // 后端主页文件
│   ├── info.js                            // 拍卖消息路由及api集合文件
│   ├── previews.js                        // 拍卖预告路由及api集合文件
│   └── users.js                           // 用户路由及api集合文件
└── main.js                           	   // vue入口文件,控制路由及资源控制

./static                                   // 系统文件
├── css
│   ├── addinfo.css                        // 添加拍卖公告样式文件
│   ├── addlist.css                        // 添加拍卖预告样式文件
│   ├── auctioninfo.css                    // 拍卖公告详细信息页样式文件
│   ├── base.css                           // 暂未编写
│   ├── detial.css                         // 分项页样式文件
│   ├── detailpage.css                     // 拍卖信息及预告等详细信息样式文件
│   ├── home.css                           // 个人中心样式文件
│   ├── hotnews.css                        // 热门信息样式文件
│   ├── layout.css                         // 主页面框架样式文件
│   ├── list.css                           // 分项页详细样式文件
│   ├── listnav.css                        // 分项页导航样式文件
│   └── news.css                           // 主页页面
├── img	                                   // 网站图片文件夹
│   └── uploads                            // 上传文件保存文件夹
├── less                                   // less文件通过编译生成css文件夹中的css文件
└── loading-svg	                           // 存放加载svg动画
