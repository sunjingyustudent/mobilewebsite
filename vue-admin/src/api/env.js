/*
* 全局环境配置
* localhost／ development／ pre／ production *
* @api 后台api地址
* @link 全局链接地址
* @share 全局分享默认配置
*/
const CONFIG = {
  // 本地环境
  localhost: {
    api: 'http://web.dev.pnlyy.com/v1',
    wxUrl:'http://192.168.11.14',
    websocketApi:'ws://192.168.40.213:9505',
    link: {
      index:  'http://localhost:8080',
      useragreementUrl: 'http://vippl.dev.pnlyy.com/terms'
    },
    share: {
      defaultTitle: 'vip教室送您一节暑托体验课',//默认分享标题
      defaultDesc: '在线收获孩子的点滴成长',//默认分享描述
      defaultUrl:  '',//默认分享地址-为空则默认获取当前地址
      defaultImg: 'http://orgt5vbih.bkt.clouddn.com/wxShare.jpg',//默认分享图片
      defaultApi: ['onMenuShareAppMessage', 'onMenuShareTimeline']//默认分享渠道
    }
  },
  // DEV环境
  development: {
    api: 'http://web.dev.pnlyy.com/v1',
    wxUrl:'http://mobile.dev.peilian.com',
    websocketApi:'ws://192.168.40.213:9505',
    link: {
      index:  'http://mobile.dev.peilian.com',
      useragreementUrl: 'http://vippl.dev.pnlyy.com/terms'
    },
    share: {
      defaultTitle: 'vip教室送您一节暑托体验课',//默认分享标题
      defaultDesc: '在线收获孩子的点滴成长',//默认分享描述
      defaultUrl:  '',//默认分享地址-为空则默认获取当前地址
      defaultImg: 'http://orgt5vbih.bkt.clouddn.com/wxShare.jpg',//默认分享图片
      defaultApi: ['onMenuShareAppMessage', 'onMenuShareTimeline']//默认分享渠道
    }
  },
  // PRE环境
  pre: {
    api: 'webapi.pre.pnlyy.com/v1',
    wxUrl:'http://mobile.pre.peilian.com',
    websocketApi:'ws://192.168.40.213:9505',
    link: {
      index:  'http://mobile.pre.peilian.com',
      useragreementUrl: 'http://vippl.pnlyy.com/terms'
    },
    share: {
      defaultTitle: 'vip教室送您一节暑托体验课',//默认分享标题
      defaultDesc: '在线收获孩子的点滴成长',//默认分享描述
      defaultUrl:  '',//默认分享地址-为空则默认获取当前地址
      defaultImg: 'http://orgt5vbih.bkt.clouddn.com/wxShare.jpg',//默认分享图片
      defaultApi: ['onMenuShareAppMessage', 'onMenuShareTimeline']//默认分享渠道
    }
  },
  // PRD环境
  production: {
    api: 'http://webapi.pnlyy.com/v1',
    wxUrl:'http://mobile.peilian.com',
    websocketApi:'ws://114.55.250.31:9605',
    link: {
      index:  'http://mobile.peilian.com',
      useragreementUrl: 'http://vippl.pnlyy.com/terms'
    },
    share: {
      defaultTitle: 'vip教室送您一节暑托体验课',//默认分享标题
      defaultDesc: '在线收获孩子的点滴成长',//默认分享描述
      defaultUrl:  '',//默认分享地址-为空则默认获取当前地址
      defaultImg: 'http://orgt5vbih.bkt.clouddn.com/wxShare.jpg',//默认分享图片
      defaultApi: ['onMenuShareAppMessage', 'onMenuShareTimeline']//默认分享渠道
    }
  }
};

//检测环境
let host = window.location.host;
if(host.indexOf('mobile.dev.peilian.com')>-1){
  global.APIMSG = CONFIG.development;
}else if(host.indexOf('mobile.pre.peilian.com')>-1){
  global.APIMSG = CONFIG.pre;
}else if(host.indexOf('mobile.peilian.com')>-1){
  global.APIMSG = CONFIG.production;
}else if(host.indexOf('mobile.pnlyy.com')>-1){
  global.APIMSG = CONFIG.production;
}else{
  global.APIMSG = CONFIG.localhost;
}

export default global.APIMSG;
