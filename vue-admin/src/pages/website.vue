<template>
  <div class="website-wrap">
    <!-- 官网 -->
    <div v-if="!consultationShowhide">
      <!--首页banner图-->
      <div class="website-home-page-banner">
       <img src="../assets/images/home_page_banner.png" alt="首页banner图" class="website-home-page-banner-img">
     </div>
     <!--注册-->
     <div class="website-register">
       <div class="register-tip-img">
        免费领取
        <span class="register-tip-height">50分钟1对1</span>体验课程
      </div>
      <span class="register-bottom-tip">
        国际用户请下载"VIP陪练" APP后领取体验课
      </span>
      <input placeholder="请输入您孩子的名字" class="register-input" v-model="userName" v-on:blur="checkName" maxlength="16">
      <input placeholder="请输入您的手机号码" class="register-input" v-on:blur="checkPhone" v-model="userPhone" maxlength="11">
      <div class="register-code register-input">
        <input placeholder="请输入手机验证码" class="register-code-input" v-model="phoneCode" v-on:blur="checkPhoneCode" maxlength="5">
        <span class="register-code-button" @click="timeDown" :disable="disable">{{getPhoneCodeButton}}</span>
      </div>
      <span class="register-wran-span">{{warnTip}}</span>
      <div class="get-class-button" @click="userRegister" :disable="registerDisable">
        立即领取体验课
      </div>
      <span class="register-bottom-tip-new" @click="useragreement">
        点击立即领取即代表您同意
        <span class="register-tip-new-link">
         《VIP陪练用户协议》
       </span>
     </span>
   </div>
   <!--教学模式-->
   <div class="website-teach-model">
     <img src="../assets/icon/tips_title_icon.png" alt="" class="tips_title_icon">
     <span class="website-teach-title">教学模式</span>
     <div class="teach-type" ref="showUpFlag">
      <img src="../assets/images/25min.png" class="teach-type-item">
      <img src="../assets/images/50min.png" class="teach-type-item float-right">
    </div>
    <!--视频播放-->
    <div class="teach-video-box" @click="playTeachVideo()">
      <video preload="preload" v-show="videoFlag" ref="videoPlay" src="http://vip-video.pnlyy.com/vip_music.mp4" class="teaching-video">
      </video>
      <a class="teach-video-bg-box" v-show="!videoFlag">
       <img src="../assets/images/video_cover.jpg" class="teach-video-bg">
     </a>
   </div>
   <!--3个文案-->
   <div class="teach-info">
     <div class="teach-info-box">
      <img src="../assets/icon/icon_teacher.png" class="teach-icon">
      <div class="teach-text">
        联合师范音乐学院打造专属于
        <span class="light">“你”</span>的陪练体系
      </div>
    </div>
    <div class="teach-info-box">
      <img src="../assets/icon/time_icon.png" class="teach-icon">
      <div class="teach-text">
        科学合理设计陪练时间，确保练琴效果<span class="light">有保障</span>
      </div>
    </div>
    <div class="teach-info-box">
      <img src="../assets/icon/icon_heart.png" class="teach-icon">
      <div class="teach-text">
        购买课时使用<span class="light">无期限</span>，退款安全有保障
      </div>
    </div>
  </div>
  <!--为什么使用vip陪练-->
  <div class="why-use">
    <span class="why-use-small-span">为什么孩子要使用</span>
    <span class="why-use-big-span">VIP陪练？</span>
    <div class="slide-photo" ref="slideLeft">
     <ul class="slide-ul">
      <li class="cell" v-for="(item,index) in photoList">
       <img :src="item.img" class="slide-photo-img">
       <div class="heart-text">
         <span class="heart-text-title">{{item.title}}
         </span>
         <span class="heart-text-content">
           {{item.content}}
         </span>
       </div>
     </li>
   </ul>
 </div>
</div>
</div>
<!--师资力量-->
<div class="teacher-power">
 <img src="../assets/images/teacher-power.jpg" class="teacher-power-img">
 <div class="teacher-power-wrap">
  <div class="teacher-power-box">
    <div class="tip1">
     <span class="tip-span">学员来自
     </span>
     <span class="tip-span">
       全球<span class="lightspan"> 13 </span>个国家
     </span>
   </div>
   <div class="tip2">
     <span class="tip-span">
       累计服务
     </span>
     <span class="tip-span">
       <span class="lightspan"> 30000+ </span>学员
     </span>
   </div>
   <div class="tip3">
     <span class="tip-span">
       老师来自全国
     </span>
     <span class="tip-span">
       <span class="lightspan"> 24  </span>大音乐类高校
     </span>
     <span class="tip-span">
       联合教研研究所
     </span>
   </div>
   <div class="tip4">
     <span class="tip-span">
       陪练老师
     </span>
     <span class="tip-span">
       <span class="lightspan"> 3000+  </span>陪练老师
     </span>
   </div>
 </div>

</div>

</div>
<!--贴心的服务-->
<div class="warm-heart">
 <div class="warm-heart-title">
  <img src="../assets/icon/tips_title_icon.png" alt="" class="tips_title_icon">
  <span class="website-teach-title">贴心的服务</span>
</div>
<span class="ask-kefu">
  <a href="javascript:void(0);" class="ask-kefu-a" @click="consultationShow">
   咨询客服
   <img src="../assets/images/call_on.png" class="call-on-img">
 </a>
</span>
<div class="warm-owner-kefu">
  <img src="../assets/images/owner_kefu.jpg" class="warm-owner-kefu-img">
  <span class="owner_kefu-title">
   专属课程顾问 让您安心便捷
 </span>
 <div class="owner_kefu-word">
   我们致力于为您的孩子提供专业，个性化的陪练定制服务，彻底解决他的练琴问题。在与您的初次接触中，课程顾问会询问包括孩子年龄，学琴时间，教材程度，性格，热爱程度等多项数据，综合匹配最适合孩子的陪练老师，并不断根据您的反馈跟踪孩子的练琴效果，让您放心无忧。
 </div>
</div>
<div class="warm-vip-promise">
  <img src="../assets/images/promise_icon.jpg" class="promise-icon">
  <div class="promise-word">
   <span class="promise-word-span">VIP陪练承诺
   </span>
   <span class="promise-word-span promise-word-span-small">购买课时使用无期限，退款安全有保障
   </span>
 </div>
</div>
</div>
<!--底部-->
<div class="home-footer">
 <div class="summarize">
  <span class="summarize-title summarize-span">
   VIP陪练
 </span>
 <span class="summarize-word summarize-span">
   VIP陪练隶属于上海妙克信息科技有限公司，公司成立于2014年，我们一直专注于解决5-16岁青少年的练琴问题，以“孩子错音少，练琴效果好”为目标而努力。3年来，VIP陪练的服务质量获得大量家长认可，同时也获得了顶级风投机构的青睐，业务正在迅猛成长中。
 </span>
 <span class="summarize-title summarize-span down-load">学生端APP下载</span>
 <div class="down-load-button">
   <div class="app_down" @click="iosDown">
     <img src="../assets/icon/ios.png" class="app_type_icon">
     <div class="app_type_text">
       iPhone
     </div>
   </div>
   <div class="app_down" @click="androidDown">
     <img src="../assets/icon/android.png" class="app_type_icon">
     <div class="app_type_text">
       Android
     </div>
   </div>
 </div>
</div>
<div class="company-info">
  <span class="company-span">客服电话 400-6060-854</span>
  <span class="company-span">
   公司地址
   <span class="company-span-small">
    上海市杨浦区凤城巷5号201室
  </span>
</span>
<span class="company-span">
 联系邮箱
 <span class="company-span-small">
  hr@pnlyy.com
</span>
</span>
<div class="company-copyright">
 <a target="_blank" href="http://www.miitbeian.gov.cn/" class="copyright-a">
  <span class="company-copyright-span">沪ICP备15001014号-1</span>
  <span class="company-copyright-span">版权所有©2017 上海妙克信息科技有限公司</span>
</a>
</div>
<div class="zhanwei">
</div>
</div>
</div>
<div class="toUp" v-show="toUpFlag" >
 <p @click="backTop">免费领取体验课</p><span @click="consultationShow">在线咨询</span>
</div>
</div>
<!-- 官网 -->
<!-- 聊天系统 -->
<div class='close' v-if='consultationShowhide' @click="setConsultation"></div>
<chat-vue class="chat-vue" v-if='consultationShowhide' @ievent = "ievent"></chat-vue>
</div>
</template>
<style lang="less">
  .chat-vue {
    position: absolute;
    z-index: 2009;
    right: 0;
    top: 0;
  }
  .close {
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2010;
  }
// 首页banner图
.website-wrap {
  font-family: "Microsoft YaHei";
  position: relative;
  .website-home-page-banner {
    height: 306/20rem;
    .website-home-page-banner-img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  } //返回顶部
  .toUp {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    height: 45/20rem;
    background: #ffffff;
    color: #fff;
    line-height: 45/20rem;
    box-shadow: 4/20rem -1/20rem 0.5rem #999;
    p {
      display: inline-block;
      width: 70%;
      height: 100%;
      background: #fd5e02;
      text-align: center;
    }
    span {
      display: inline-block;
      background: #fd5e02;
      float: right;
      text-align: center;
      width: 29.5%;
      height: 100%;
    }
  } //注册
  .website-register {
    .register-tip-img {
      width: 334/20rem;
      height: 36/20rem;
      line-height: 36/20rem;
      text-align: center;
      font-size: 1.1rem;
      margin: 19/20rem auto;
      .register-tip-height {
        color: #fd5e02;
        font-size: 1.4rem;
      }
    }
    .register-input {
      width: 326/20rem;
      height: 46/20rem;
      background: #f3f3f3;
      border-radius: 0.1rem;
      padding: 0.5rem;
      margin: 0rem 25/20rem 0.5rem 24/20rem;
      font-size: 14/20rem;
    }
    .register-code {
      position: relative;
      .register-code-input {
        background: #f3f3f3;
        width: 229/20rem;
        font-size: 14/20rem;
      }
      .register-code-button {
        position: absolute;
        text-align: center;
        width: 96/20rem;
        display: inline-block;
        background: #fea802;
        border-radius: 2px;
        height: 46/20rem;
        right: 0rem;
        top: 0rem;
        font-size: 14/20rem;
        line-height: 46/20rem;
        color: #fff;
      }
    }
    .register-wran-span {
      width: 326/20rem;
      margin: 0rem 25/20rem 15/20rem 24/20rem;
      display: block;
      height: 17/20rem;
      line-height: 17/20rem;
      font-size: 14/20rem;
      color: #ff0808;
    }
    .get-class-button {
      background: #fd5e02;
      border: 1px solid #fd5e02;
      border-radius: 4/20rem;
      width: 341/20rem;
      height: 58/20rem;
      margin: 0 auto;
      color: #fff;
      line-height: 58/20rem;
      text-align: center;
      font-size: 24/20rem;
    }
    .register-bottom-tip {
      display: block;
      width: 343/20rem;
      height: 18/20rem;
      margin: 6/20rem 16/20rem 16/20rem 16/20rem;
      font-size: 14/20rem;
      color: #999999;
      line-height: 18/20rem;
      text-align: center;
    }
    .register-bottom-tip-new {
      margin: 15/20rem;
      display: block;
      text-align: center;
      height: 14/20rem;
      font-size: 14/20rem;
      line-height: 14/20rem;
      color: #9b9b9b;
      .register-tip-new-link {
        color: #fd6004;
      }
    }
  } //教学模式
  .website-teach-model {
    padding: 0rem 15/20rem;
    .tips_title_icon {
      width: 53/20rem;
      height: 7/20rem;
    }
    .website-teach-title {
      display: block;
      width: 146/20rem;
      height: 37/20rem;
      line-height: 37/20rem;
      text-align: center;
      color: #fd5e02;
      font-size: 36/20rem;
      margin-top: 6/20rem;
    }
    .teach-type {
      width: 345/20rem;
      height: 60/20rem;
      margin-top: 30/20rem;
      .teach-type-item {
        width: 166/20rem;
        float: left;
      }
      .float-right {
        float: right;
      }
    }
    .teach-video-box {
      border-radius: 5/20rem;
      width: 100%;
      margin-top: 30/20rem;
      margin-bottom: 31/20rem;
      .teaching-video {
        display: block;
        text-align: center;
        width: 100%;
        margin: 0;
      }
      .teach-video-bg-box {
        display: block;
        position: relative;
        width: 100%;
        height: 205/20rem;
        .teach-video-bg {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .teach-video-button {
          position: relative;
          width: 1rem;
          height: 1rem;
          left: 344/40rem;
          top: 259/40rem;
        }
      }
    }
    .teach-info {
      .teach-info-box{
        width: 345/20rem;
        height: 50/20rem;
        margin-bottom: 30/20rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        .teach-icon{
          width: 50/20rem;
          height: 50/20rem;
          margin-right: .75rem;
        }
        .teach-text{
          -webkit-box-flex:1;
          -webkitfelx:1;
          flex:1;
          line-height: 25/20rem;
          color: #1B1D22;
          font-size: 1rem;
          .light{
            color: #FD5E02;
            font-size: 24/20rem;
          }
        }
      }
    }
    .why-use {
      margin-top: 52/20rem;
      .why-use-small-span {
        display: block;
        height: 29/20rem;
        line-height: 29/20rem;
        color: #999;
        font-size: 24/20rem;
      }
      .why-use-big-span {
        display: block;
        height: 44/20rem;
        line-height: 44/20rem;
        font-size: 36px;
        color: #fd5e02;
      }
      .slide-photo {
        width: 100%;
        margin-top: 30/20rem;
        overflow-x: scroll;
        -webkit-overflow-x: scroll;
        position: relative;
      }
      .slide-photo::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: #fff;
      }
      .slide-ul {
        min-width: 312/20*6rem;
        display: flex;
        justify-content: flex-start;
      }
      .cell {
        display: inline-block;
        margin-right: .75rem;
        .slide-photo-img {
          width: 312/20rem;
          vertical-align: middle;
        }
        .heart-text{
          width: 312/20rem;
          .heart-text-title{
            width: 312/20rem;
            display: block;
            height: 54/20rem;
            line-height: 54/20rem;
            font-size: 1rem;
          }
          .heart-text-content{
            display: block;
            width: 312/20rem;
            height: 92/20rem;
            line-height: 23/20rem;
            font-size: .7rem;
            color: #666;
          }
        }

      }
    }
  } //师资力量
  .teacher-power {
    width: 100%;
    margin-top: 81/20rem;
    .teacher-power-img {
      width: 100%;
      vertical-align: middle;
    }
    .teacher-power-wrap{
      width: 100%;
      height: 162/20rem;
      background-color: #FD5E02;
      padding: 25/20rem 50/20rem 16/20rem 50/20rem;
      color: #fff;
      font-size: .6rem;
      .teacher-power-box{
        width: 100%;
        height: 100%;
        position: relative;
        .tip1{
          position: absolute;
          top: 0;
          left: 0;
          width: 120/20rem;
          height: 40/20rem;
          line-height: 1rem;
        }
        .tip2{
          position: absolute;
          top: 0;
          left: 150/20rem;
          width: 120/20rem;
          height: 60/20rem;
          line-height: 1rem;
        }
        .tip3{
          position: absolute;
          top: 60/20rem;
          left: 0rem;
          width: 120/20rem;
          height: 40/20rem;
          line-height: 1rem;
        }
        .tip4{
          position: absolute;
          top: 60/20rem;
          left: 150/20rem;
          width: 120/20rem;
          height: 40/20rem;
          line-height: 1rem;
        }
        .tip-span{
          display: block;
        }
        .lightspan{
          font-size: 1rem;
        }
      }
      
    }
    
  } //贴心的服务
  .warm-heart {
    width: 345/20rem;
    margin: 4rem 15/20rem 0rem 15/20rem;
    border-bottom: 1px solid #ecedef;
    .warm-heart-title {
      width: 187/20rem;
      height: 49/20rem;
      .tips_title_icon {
        width: 53/20rem;
        height: 7/20rem;
        display: block;
      }
      .website-teach-title {
        display: block;
        width: 187/20rem;
        height: 37/20rem;
        line-height: 37/20rem;
        text-align: center;
        color: #fd5e02;
        font-size: 36/20rem;
        margin-top: 6/20rem;
      }
    }
    .ask-kefu {
      display: block;
      margin: 30/20rem 0rem;
      border-radius: 2px;
      width: 119/20rem;
      height: 30/20rem;
      background-color: #fd5e02;
      color: #fff;
      text-align: center;
      line-height: 30/20rem;
      font-size: 16/20rem;
      .call-on-img {
        margin-left: 0.4rem;
        width: 1.2rem;
        height: 1.2rem;
        vertical-align: middle;
      }
      .ask-kefu-a {
        color: #fff;
      }
    }
    .warm-owner-kefu {
      width: 100%;
      height: 392/20rem;
      .warm-owner-kefu-img {
        height: 191/20rem;
      }
      .owner_kefu-title {
        width: 256/20rem;
        height: 24/20rem;
        line-height: 24/20rem;
        font-size: 1rem;
        display: block;
        margin: 31/20rem 0rem 10/20rem;
      }
      .owner_kefu-word {
        font-size: 14/20rem;
        color: #666;
      }
    }
    .warm-vip-promise {
      width: 316/20rem;
      height: 56/20rem;
      padding: 3rem 0rem 6rem 0rem;
      .promise-icon {
        display: block;
        width: 61/20rem;
        height: 56/20rem;
        float: left;
      }
      .promise-word {
        width: 240/20rem;
        height: 56/20rem;
        float: right;
        .promise-word-span {
          font-family: HYQiHei-FZS;
          font-size: 24/20rem;
          color: #000;
          text-align: left;
          display: block;
        }
        .promise-word-span-small {
          font-size: 14/20rem;
        }
      }
    }
  } //底部总结
  .summarize {
    width: 345/20rem;
    margin: 2rem 15/20rem;
    .summarize-span {
      display: block;
    }
    .summarize-title {
      color: #333333;
      font-size: 18/20rem;
    }
    .summarize-word {
      color: #333;
      font-size: 14/20rem;
    }
    .down-load {
      margin: 30/20rem 0rem 15/20rem 0rem;
    }
    .down-load-button {
      width: 345/20rem;
      height: 35/20rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      .app_down{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        margin-right: .6rem;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        .app_type_icon{
         height: 35/20rem;
         margin-right: 11/20rem;
       }
       .app_type_text{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        border-radius: .1rem;
        border:1px solid #666666;
        line-height: 35/20rem;
        text-align: center;
        color: #333;
        font-size: .7rem;
      }
    }

    .down-load-img {
      display: inline-block;
      width: 159/20rem;
      height: 35/20rem;
      float: left;
    }
    .down-load-img-right {
      float: right;
    }
  }
  } //底部公司详情
  .company-info {
    width: 100%;
    margin-top: 41/20rem;
    height: 207/20rem;
    background-color: #fd5e02;
    color: #fff;
    padding-top: 30/20rem;
    .company-span {
      display: block;
      height: 1rem;
      line-height: 1rem;
      font-size: 1rem;
      margin-left: 50/20rem;
      margin-bottom: 15/20rem;
      .company-span-small {
        font-size: 14/20rem;
      }
    }
    .zhanwei {
      width: 100%;
      height: 55/20rem;
    }
    .company-copyright {
      width: 345/20rem;
      margin: 12/20rem 15/20rem 0rem 15/20rem;
      padding-top: 13/20rem;
      border-top: 1px solid #fff;
      text-align: center;
      .copyright-a {
        color: #fff;
      }
      .company-copyright-span {
        display: block;
        height: 12/20rem;
        line-height: 12/20rem;
        font-size: 12/20rem;
        margin-bottom: 7/20rem;
      }
    }
  }
}
</style>
<script>
  import Vue from "vue";
  import ChatVue from "./chat.vue";
  Vue.component("ChatVue", ChatVue);
  import classPost from "../service/home";
  import { Toast } from "mint-ui";
  import Env from "../api/env.js";
  const util = require("../util/util.js");
  export default {
    data() {
      return {
      //返回数据
      videoFlag: false,
      toUpFlag: false,
      disable: true,
      registerDisable: true,
      getPhoneCodeButton: "获取验证码",
      warnTip: "",
      userName: "",
      userPhone: "",
      phoneCode: "",
      cookies: "",
      Consultation: true,
      consultationShowhide: false,
      photoList: [
      { img: "/static/img/heart1.jpg",title:"优质师资保障" ,content:"VIP陪练老师均为专业音乐学院／师范音乐学院／具有教辅经验。拥有良好的教育背景，经过层层筛选与培训，爱孩子、懂音乐，擅长线上陪练，并可以及时纠正孩子的错音和错误节奏。"},
      { img: "/static/img/heart2.jpg",title:"1对1专属服务",content:"因材施教，根据孩子的的特点与进度，匹配不同程度的陪练老师，专业班主任老师1对1，全程提供五星级服务，为家长解答各种问题，专属陪练老师针对孩子的真实情况，有效提升练琴效率。" },
      { img: "/static/img/heart3.jpg",title:"正确的练琴方式",content:"告别回课难，减少孩子上课中的错误，让孩子收到主课老师的赞扬，建立信心，让家长看到正确练琴的效果。" },
      { img: "/static/img/heart4.jpg",title:"上课透明 效果跟进",content:"每节课都有陪练老师认真填写的课后单，家长可以很直接看到孩子练琴过程中存在的问题与演奏中的长处，让家长放心。" },
      { img: "/static/img/heart5.jpg",title:"随时上课 风雨无阻",content:"手机与Pad，多终端覆盖。自由选择上课时间，还可指定陪练老师，免除线下陪练的诸多不便，高效利用时间，解放家长的同时还方便孩子练习。" },
      { img: "/static/img/heart6.jpg",title:"随时退款保障",content:"对课程不满意，对陪练老师不满意，对效果不满意，随时提出退款要求，VIP陪练统统满足。" }
      ],

      source: ""
    };
  },
  created() {},
  components: {
    //组件
  },
  methods: {
    ievent(data) {
      const _this = this;
      if (data) {
        _this.consultationShowhide = false;
      }
    },
    setConsultation() {
      const _this = this;
      _this.consultationShowhide = false;
      _this.videoFlag=false;
    },
    //调用方法
    consultationShow() {
      const _this = this;
      _this.consultationShowhide = true;
    },
    //获取用户来源
    userSource: function() {
      let _this = this;
      let url = window.location.search.substr(1);
      let parms = url.split("&");
      for (var i = 0; i < parms.length; i++) {
        let item = parms[i].split("=");
        if (item[0] == "from") {
          _this.source = item[1];
          break;
        }
      }
    },
    //播放视频
    playTeachVideo: function() {
      let _this = this;
      _this.videoFlag = true;
      _this.$refs.videoPlay.play();
    },
    //滚动屏幕
    scrllCr: function() {
      let _this = this;
      let height = document.documentElement.clientHeight;
      window.onscroll = function() {
        let scrllCrTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        if (scrllCrTop > height) {
          _this.toUpFlag = true;
        } else {
          _this.toUpFlag = false;
        }
      };
    },
    //检查姓名
    checkName: function() {
      let _this = this;
      if (_this.userName.trim() == "") {
        _this.warnTip = "请填写用户名称";
      } else {
        let reg = /^[\u2E80-\u9FFF]+$|\d|[A-Za-z]/;
        //Unicode编码中的汉字范围
        if (!reg.test(_this.userName)) {
          _this.warnTip = "只能输入汉字、数字、字母";
        } else {
          _this.warnTip = "";
        }
      }
    },
    //检查手机号
    checkPhone: function() {
      let _this = this;
      let reg = /^\d{11}$/;
      if (!reg.test(_this.userPhone)) {
        _this.warnTip = "手机号必须是11位数字";
      } else {
        if (_this.userPhone.trim() == "") {
          _this.warnTip = "手机号输入有误";
        } else {
          _this.warnTip = "";
        }
      }
    },
    //获取验证码并倒计时，
    timeDown: function() {
      let _this = this;
      if (_this.disable == false) {
        return;
      }
      _this.checkPhone();
      if (_this.warnTip != "") {
        return;
      } else {
        //倒计时
        let s = 60;
        _this.disable = false;
        let t1 = setInterval(function() {
          s--;
          _this.getPhoneCodeButton = s + "s";
          if (s == 0) {
            clearInterval(t1);
            _this.getPhoneCodeButton = "获取验证码";
            _this.disable = true;
          }
        }, 1000);
        //请求发送验证码接口
        let params = {
          mobile: _this.userPhone,
          area: "+86"
        };
        classPost
        .getPhoneCode(params)
        .then(res => {
          let instance = Toast("发送成功");
          setTimeout(() => {
            instance.close();
          }, 2000);
            //验证码通过表示可以注册成功
            // _this.cookies = util.getCookies("reCreate");
          })
        .catch(error => {
          if (error.hasOwnProperty("data")) {
            _this.warnTip = error.data.message;
          }
          clearInterval(t1);
          _this.getPhoneCodeButton = "获取验证码";
          _this.disable = true;
        });
      }
    },
    //检查验证码
    checkPhoneCode: function() {
      let _this = this;
      let reg = /^\d{5}$/;
      if (!reg.test(_this.phoneCode)) {
        _this.warnTip = "验证码有误";
      } else {
        _this.warnTip = "";
      }
    },
    //立即注册
    userRegister: function() {
      let _this = this;
      _this.checkName();
      if (_this.warnTip != "") {
        return;
      }
      _this.checkPhone();
      if (_this.warnTip != "") {
        return;
      }
      _this.checkPhoneCode();
      if (_this.warnTip != "") {
        return;
      }

      //判断cookie是否存在
      if (_this.cookies == "") {
        _this.cookies = util.getCookies("randomStr");
      }

      if (_this.registerDisable == false) {
        return;
      }
      _this.registerDisable = false;
      //注册用户，请求接口
      let params = {
        area: "+86",
        phone: _this.userPhone,
        name: _this.userName,
        code: _this.phoneCode,
        cookie: _this.cookies,
        // userIP:_this.ip
        source: _this.source
      };
      classPost
      .userRegisters(params)
      .then(res => {
        _this.registerDisable = true;
          //  后来改
          if (res.data.user_uuid != "") {
            document.cookie = "uuid=" + res.data.user_uuid;
          }
          window.location.href = APIMSG.wxUrl + "/registerSuccess";
        })
      .catch(error => {
        _this.registerDisable = true;
        let instance = Toast(error.data.message);
        setTimeout(() => {
          instance.close();
        }, 2000);
      });
    },
    //用户点击用户协议
    useragreement: function() {
      window.location.href = Env.link.useragreementUrl;
    },
    //回到顶部
    backTop() {
      window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    //ios下载跳转
    iosDown: function() {
      window.location.href =
      "https://itunes.apple.com/cn/app/vip陪练-学生端/id1174747377?mt=8";
    },
    //android下载跳转
    androidDown: function() {
      window.location.href =
      "http://a.app.qq.com/o/simple.jsp?pkgname=com.pnlyy.pnlclass.pnlclass_student";
    }
  },
  mounted() {
    this.scrllCr();
    this.userSource();
  },
  watch: {}
};
</script>
