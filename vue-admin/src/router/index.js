/*
* 路由配置
*/
import Vue from 'vue';
import Router from 'vue-router';
import title from 'vue-wechat-title';//页面标题
Vue.use(title);
Vue.use(Router);

//路由入口
const Index = r => require.ensure([], () => r(require('../pages/index.vue')), 'Index');//入口

//移动端首页
const Website = r => require.ensure([], () => r(require('../pages/website.vue')), 'Website');//入口

//注册成功
const RegisterSuccess = r => require.ensure([], () => r(require('../pages/registerSuccess.vue')), 'RegisterSuccess');//入口

//微信上传图片
const WxUploadImg = r => require.ensure([], () => r(require('../pages/wxUploadImg.vue')), 'WxUploadImg');
//微信分享
const WxShare = r => require.ensure([], () => r(require('../pages/wxShare.vue')), 'WxShare');
//微信禁止分享
const WxShareForbids = r => require.ensure([], () => r(require('../pages/wxShareForbids.vue')), 'WxShareForbids');
//微信支付
const WxPay = r => require.ensure([], () => r(require('../pages/wxPay.vue')), 'WxPay');

export default new Router({
  mode: 'history',
  routes: [
    //入口
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: 'h5组件库(vue)'
      }
    },
    {
      path: '/',
      name: 'website',
      component: Website,
      meta: {
        title: 'VIP陪练'
      }
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: RegisterSuccess,
      meta: {
        title: '注册成功'
      }
    },
    //微信上传图片
    {
      path: '/wxUploadImg',
      name: 'wxUploadImg',
      component: WxUploadImg,
      meta: {
        title: '微信api-上传图片'
      }
    },
    //微信分享
    {
      path: '/wxShare',
      name: 'wxShare',
      component: WxShare,
      meta: {
        title: '微信api-分享'
      }
    },
    //微信禁止分享
    {
      path: '/wxShareForbids',
      name: 'wxShareForbids',
      component: WxShareForbids,
      meta: {
        title: '微信api-禁止分享'
      }
    },
    //微信支付
    {
      path: '/wxPay',
      name: 'wxPay',
      component: WxPay,
      meta: {
        title: '微信api-支付'
      }
    }
  ]
});
