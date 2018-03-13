<template>
	<div class="register-success">
		<img src="../assets/images/register_success.png" alt="" class="register-success-img">
		<span class="class_success">您已申请免费体验课成功</span>
		<div class="tip-word-box">
			<span class="tip-word">请您留意手机，您的专属客服顾问将会在稍后联系您</span>
			<span class="tip-word">您可以点击下面按钮，下载“VIP陪练”学生端APP</span>
		</div>
		<div class="down-load-app">
			<img src="../assets/images/ios.png" alt="" class="down-load-app-img" @click="iosDown">
			<img src="../assets/images/android.png" alt="" class="down-load-app-img float-right" @click="androidDown">
		</div>
		<div class="footer" @click="goHome">
			返回首页
		</div>
	</div>
</template>
<style lang="less">
	.register-success{
		.register-success-img{
			width: 232/20rem;
			height: 146/20rem;
			margin: 95/20rem 143/40rem 32/20rem 143/40rem;
		}
		@media screen and (min-width:720px){
			.register-success-img{
				width: 232/20rem;
				margin: 55/20rem 143/40rem 32/20rem 143/40rem;
			}
  		}
		.class_success{
			display: block;
			width: 375/20rem;
			height: 18/20rem;
			text-align: center;
			line-height: 18/20rem;
			font-size:1rem;
			color:#fd5e02;
			margin-bottom: 1rem;
		}
		.tip-word-box{
			padding: 0rem 18/20rem;
		}
		.tip-word{
			display:block;
			font-size: 16/20rem;
			color:#999999;
			line-height:1rem;
			margin-bottom: 1rem;
		}
		@media screen and (min-width:720px){
			.tip-word{
				display:block;
				font-size: 14/20rem;
				color:#999999;
				line-height:1rem;
				margin-bottom: 1rem;
			}
  		}
		.down-load-app{
			width: 269/20rem;
			height: 35/20rem;
			margin: 0 auto;
			.down-load-app-img{
				width: 119/20rem;
				height: 35/20rem;
				float: left;
			}
			.float-right{
				float: right;
			}
		}
		.footer{
			width: 100%;
			height: 45/20rem;
			position: absolute;
			bottom:0;
			background:#fd5e02;
			color: #fff;
			text-align: center;
			line-height: 45/20rem;
			font-size: 1rem;
		}
	}
</style>
<script>
import Vue from "vue";
import Env from "../api/env.js";

export default {
  data() {
    return {
      //返回数据
    };
  },
  created() {},
  components: {
    //组件
  },
  methods: {
    //调用方法
    //跳转回首页
    goHome: function() {
      window.location.href = APIMSG.link.index;
    },
    iosDown: function() {
      window.location.href =
        "https://itunes.apple.com/cn/app/vip陪练-学生端/id1174747377?mt=8";
    },
    androidDown: function() {
      window.location.href =
        "http://a.app.qq.com/o/simple.jsp?pkgname=com.pnlyy.pnlclass.pnlclass_student";
    }
  },
  mounted() {}
};
</script>
