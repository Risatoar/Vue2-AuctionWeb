# auctionweb

> vue2.0 重构拍卖信息网页

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目状态：正在制作
## 描述
- 使用vuejs+node+mongodb+es6搭建的拍卖信息网站系统
 -------------------
- **作者**   risatoar
- **email** risatoar@163.com
- **GitHub** https://github.com/xuxiang9608
- **开始日期**  2017/10/1
- **项目线上地址(http://risatoar.cn)**
	后台暂未部署到服务器端,敬请等待。
 -------------------

## 功能实现
- [x] 游客普通注册+管理员登录
- [x] 首页信息展示
- [x] 根据对应的navi展示相应分类信息列表
- [x] 用户个人中心
- [ ] 用户进行增删改查
- [x] 评价系统
- [ ] 拍卖预告系统
- [ ] 后台管理系统


## 前端开发
- **框架**： vue-v2.9.1全家桶+bootstrap-v3.37+jQuery-v1.8.0
- **css处理**： less
- **ui框架**：  iview
- **less编译工具**： koala
- **端口监听**： 8080
- **编辑器**：  sublime text3
- **包管理工具**：  npm
- **touch样式管理**：  vue-touch-ripple
- **组件按需加载管理**：  babel-plugin-import
- **列表页组件加载渲染**：  vue-content-placeholders
- **富文本编辑器**：  vue2-editor
- **图片懒加载**：  vue-lazyload
 -------------------

## 后端开发
- **框架**： express
- **服务器端**：  nodeJs
- **node进程管理器**：  pm2
- **数据库**：  mongodb
- **数据库框架**： mongoose
- **版本依赖管理**：  npm

### 数据备份操作
- **备份**：mongodump -h 127.0.0.1:27017 -d auction -o C:\ (适合没有账号密码的用户)
- **数据恢复**：mongorestore  -h 127.0.0.1:27017 -d auction --dir C:\auction
 -------------------

## 性能优化方案
- **图片展示采用懒加载**： 利用vue-lazyload组件实现
- **页面静态资源减少**： 利用vue的数据驱动视图思想,页面的资源大部分通过请求后台资源得到
- **减少多余的ajax请求**： 减少多余的ajax请求,合并部分后台接口,提高数据复用性
- **优化代码**： 通过反复检查减少冗余代码
- **视觉干预**： 通过loading画面进行视觉欺骗,让用户度过白屏视觉
- **数据库选择**： 通过对mongodb与mysql的对比,mongodb在数据处理上的性能更加出色,并且mongodb能存储更符合前端操作的json数据


## Vue.js学习资源
- **官网**：  https://cn.vuejs.org/
- **vuejs源码**：  https://github.com/vuejs/vue
- **vuejs官方工具**：  https://github.com/vuejs
- **官方论坛**：  https://forum.vuejs.org/
- **vue组件库**：  https://github.com/vuejs/awesome-vue

## sublime 插件
- **emment**
- **csscomb**： css样式排序 使用方法：菜单Tools->Run CSScomb或在CSS文件中按快捷键Ctrl+Shift+C
- **trailingspaces**： 能高亮显示多余的空格和Tab
- **JsFormat**： 可在JS文件中通过鼠标右键->JsFormat或键盘快捷键Ctrl+Alt+F对JS进行格式化

## MIT
- **注意**： 本项目不遵从mit协议,请勿用于商业用途,分享转载请发信至作者邮箱，所有解释权归copyright所有。

