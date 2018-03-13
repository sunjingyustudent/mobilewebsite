<template>
  <div scope ref="chatHeight" class="chat-box">
    <div class="chat" id="chat">
      <!-- 初始化loading状态 -->
      <div class="mesLoading" v-if="mesLoadings" ref="mesLoading">
        <img src="../assets/images/loading.gif">
        <p>正在加载</p>
      </div>
      <div class="top clear">
        <div class="left clear">
          <div class="img"></div>
          <div class="use">
            <p>VIP陪练客服</p>
          </div>
        </div>
        <div class="right fr">X</div>
      </div>
      <div class="center" ref="divHeight">
        <!-- 点击加载更多 -->
        <div class="clkMore">
          <button @click="addMore" :disabled="moreMes">{{moreMessage}}</button>
        </div>
        <!-- 加载失败页面 -->
        <div class="errorPage" v-if="netError">
          <img src="../assets/images/errorImg.png" alt="加载失败">
          <p>网络错误，请点击重试</p>
          <button @click="connectInit">重新加载</button>
        </div>
        <!-- 消息队列 -->
        <ul ref="currentHeight" v-if="chatList">
          <li class="clear" v-for="items in initMessage">
            <div class="fl clear" v-if="items.tag=='1'">
              <span class="headBigImg"></span>
              <div class="fl">
                <p class="userName usertitle">VIP陪练客服 &nbsp;{{items.time_created}}</p>
                <p class="userMessage" v-if="items.type!='2'" v-html="items.message"></p>
                <a v-if="items.sysstatus=='99'" v-on:click="currenthave" href="javascript:void(0);">点击立即领取</a>
                <!-- <p class="userMessage" v-if="items.type!='2'" v-html="items.message"></p> -->
                <!-- <p class="userMessage" v-if="items.type!='2'">{{items.message}}<a v-if="items.sysstatus=='99'" v-on:click="currenthave" href="javascript:void(0);">点击立即领取</a></p> -->
                <img @click="enlarge($event)" v-if="items.type=='2'" :src='items.message' />
              </div>
            </div>
            <div class="fr clear" v-if="items.tag=='0'">
              <span>{{items.time_created}}</span>
              <p v-html="items.message" v-if="items.type!='2'"></p>
              <!-- 历史消息里面的src -->
              <p v-if="items.type=='2'"><img @click="enlarge($event)" v-if="items.type=='2'" :src='items.message' /></p>
              <div class="loading" v-if="items.loading==3"></div>
              <!-- <div class="sendError" v-if="items.status==2" @click="reloadMes($event)"> -->
              <div class="sendError" v-if="items.status==2">
                <div class="top-img"></div>
                <!-- <div class="bot-text">发送失败</div> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom" style="height:120px">
        <div v-show="EmojiShow" class="allEmoji">
          <ul class="clear">
            <li v-for="item in EmojiList" class="fl" @click="addEmoji(item)">
              <img :src="item.image_path" :alt="item.emoji">
            </li>
          </ul>
        </div>
        <div class="up">
          <span class="emojiImg" @click="getEmoji"></span>
          <div class="textCount" v-if="promptText">已达到字数上限</div>
        </div>
        <div class="down">
          <textarea placeholder="请输入文字或表情" v-model="usertext" ref="setfoucs" @focus="Typewriting" @keyup="usertextCount()"></textarea>
          <button @click="sendMessage" :disabled="disable" :class="{'gray':disable}">发送</button>
        </div>
      </div>
    </div>
    <!-- 图片的点击放大效果 -->
    <div  class='imgBig' ref="imgBigref" v-if="imgBigUrl">
      <div>
        <span class="closeBigImg" @click="closeBigImg"></span>
        <img :src="imgBigUrl" class="closeBigImg" @click="closeBigImg">
      </div>
    </div>
    <div class="closeEmoji" ref="closeEmojis" v-if="closeEmojiul" @click="closeEmojic"></div>
  </div>
</template>
<script>
//引入util库
const util = require("../util/util");
import classPost from "../service/home.js";
import Vue from "vue";
import Env from "../api/env";
// import { Upload, Message } from 'element-ui';
// Vue.component(Upload.name, Upload);
// Vue.component(Message.name, Message);
let ws;
let timer;
let randomStr = "";
let inter;
let n;
export default {
  data() {
    return {
      // 初始化消息
      initMessage: [],
      // 缓存uiid
      historyMessageUuid: util.getCookie("uuid") || "",
      //用户输入内容
      usertext: "",
      belowHeight: "",
      //点击加载更多
      clkNum: 20,
      currentHeight: 0,
      messageCount: 0,
      count: 0,
      //表情列表显示的 div
      EmojiShow: true,
      // 表情列表
      EmojiList: "",
      //上传图片
      imageUrl: "",
      uploadUrl: Env.api + "/chat-api/upload-image" || "",
      //加载更多禁用按钮
      moreMes: false,
      //加载更多提示信息
      moreMessage: "",
      //图片放大
      imgBigUrl: "",
      //初始化消息成功
      chatList: true,
      //表情列表的模态框
      closeEmojiul: false,
      //初始化提示
      mesLoadings: false,
      //聊天初始化失败
      netError: false,
      //默认的推送消息的a链接
      defaultnow: false,
      //字数限制显示
      promptText: false,
      //禁止发送按钮
      disable: false
    };
  },
  methods: {
    //初始化判断用户是否注册
    connectInit() {
      const _this = this;
      //添加loading
      _this.mesLoadings = true;
      //检测有没有20位唯一字符串
      if (!util.getCookie("randomStr")) {
        randomStr = util.randomStr();
        document.cookie = "randomStr=" + randomStr;
      } else {
        randomStr = util.getCookie("randomStr");
      }
      let params = { socketId: randomStr };
      //判断不存在用户uuid , 发送请求注册用户
      if (!util.getCookie("uuid")) {
        classPost
          .userRegister(params)
          .then(res => {
            // console.log("注册成功");
            // 成功后设置缓存
            document.cookie = "uuid=" + res.data.chat_uuid;
            _this.chatInit(util.getCookie("uuid"));
            //websocket开启连接
            _this.openWs();
          })
          .catch(res => {
            // console.log("注册失败");
            // Message("网络延迟,请刷新");
          });
      } else {
        //websocket开启连接
        _this.openWs();
        _this.chatInit(util.getCookie("uuid"));
      }
    },
    openWs() {
      const _this = this;
      //websocket连接
      ws = new WebSocket(Env.websocketApi);
      // ws = new WebSocket("ws://114.55.250.31:9605");
      ws.onopen = function(evt) {};
      //建立连接
      ws.onmessage = function(event) {
        //客服消息
        //event.data就是 onmessage 返回的数据
        let kefuMessage = JSON.parse(event.data);
        //本地的uuid
        let wsUuid = util.getCookie("uuid");
        if (kefuMessage.event == "CONNECT") {
          let conMessage =
            '{"url":"/chat/con-message","app_type":"2","chat_token":"abc","role":1,"uuid":"' +
            wsUuid +
            '"}';
          ws.send(conMessage);
        }
        //后台推送客服消息 收到消息
        if (kefuMessage.event == "SEND_MESSAGE") {
          // 客服表情字符串转换 url
          let kefuMessages = util.emojiReplace(
            kefuMessage.response.content,
            _this.EmojiList
          );
          let imgType = "1";
          if (kefuMessage.response.type == "image") {
            imgType = "2";
          }
          //生成本地时间
          let currentdate = new Date();
          let currentmin = currentdate.getHours();
          let currentsecond = currentdate.getMinutes();
          if (currentsecond < 10) {
            currentsecond = "0" + currentsecond;
          }
          let createTime = currentmin + ":" + currentsecond;
          //后台推送信息添加到聊天信息
          let newMessage = {
            tag: "1",
            message: kefuMessages,
            time_created: createTime,
            type: imgType
          };
          // console.log(newMessage);
          _this.initMessage.push(newMessage);
          //监控新消息之后整体 div 的高度
          _this.$nextTick(function() {
            if (_this.$refs.currentHeight) {
              let currentHeight = _this.$refs.currentHeight.offsetHeight;
              _this.$refs.divHeight.scrollTop = currentHeight;
            }
          });
        }
      };
    },
    chatInit(uid) {
      const _this = this;
      _this.netError = false;
      //初始化不显示加载更多
      _this.moreMessage = "";
      //初始化聊天历史消息
      let params = { user_uuid: uid };
      classPost
        .getMessageList(params)
        .then(res => {
          //获取聊天记录
          _this.chatList = true;
          _this.netError = false;
          _this.mesLoadings = false;
          _this.initMessage = res.data.message.reverse();
          //如果消息小于20条不显示提示文案
          if (_this.initMessage.length >= 20) {
            _this.moreMessage = "点击加载更多";
          }
          // //监听for循环 div 的高度
          _this.$nextTick(function() {
            if (_this.$refs.currentHeight) {
              let currentHeight = _this.$refs.currentHeight.offsetHeight;
              _this.$refs.divHeight.scrollTop = currentHeight;
            }
          });
          _this.getDefaultmessages();
          //获取表情列表
          if (_this.EmojiList == "") {
            classPost
              .getEmojiList()
              .then(res => {
                _this.EmojiShow = false;
                // 获取表情列表
                _this.EmojiList = res.data.list;
              })
              .catch(res => {
                _this.EmojiShow = false;
              });
          }
        })
        .catch(res => {
          _this.chatList = false;
          _this.netError = true;
          _this.mesLoadings = false;
        });
    },
    //默认消息
    getDefaultmessages() {
      const _this = this;
      classPost
        .getDefaultmessage()
        .then(res => {
          //生成本地时间
          let currentdate = new Date();
          let currentmin = currentdate.getHours();
          let currentsecond = currentdate.getMinutes();
          if (currentsecond < 10) {
            currentsecond = "0" + currentsecond;
          }
          let createTime = currentmin + ":" + currentsecond;
          //修改默认消息的a链接
          let defaultnowmes =
            "感谢您关注VIP陪练，我们为您的孩子提供专业的在线1对1乐器陪练。目前，我们已经服务了超过13个国家的数万名琴童，欢迎您的加入。我们专门为您准备了一节50分钟免费的体验课程，快来试试吧！";
          if (res.data == defaultnowmes) {
            var sysMessages = {
              tag: "1",
              time_created: createTime,
              message: res.data,
              sysstatus: "99"
            };
          } else {
            var sysMessages = {
              tag: "1",
              time_created: createTime,
              message: res.data
            };
          }
          _this.initMessage.push(sysMessages);
          // 监控新消息之后整体 div 的高度
          _this.$nextTick(function() {
            if (_this.$refs.currentHeight) {
              //点击的时候获取重新获取 ul 的高度
              let currentHeight = _this.$refs.currentHeight.offsetHeight;
              // 点击的时候设置 div 的卷去高度
              _this.$refs.divHeight.scrollTop = currentHeight;
            }
          });
        })
        .catch(res => {});
    },
    //点击加载更多
    addMore() {
      const _this = this;
      _this.clkNum = parseInt(_this.clkNum);
      _this.clkNum += 20;
      _this.moreMes = true;
      _this.moreMessage = "正在加载";
      let uid = util.getCookie("uuid");
      //初始化聊天历史消息
      let params = { user_uuid: uid, limit: _this.clkNum };
      classPost
        .getMessageList(params)
        .then(res => {
          //获取聊天记录
          _this.moreMes = false;
          _this.moreMessage = "点击加载更多";
          _this.initMessage = res.data.message.reverse();
          _this.messageCount = _this.initMessage.length;
          // console.log(_this.messageCount);
          if (_this.messageCount < _this.clkNum) {
            _this.moreMessage = "没有更多";
            _this.moreMes = true;
          } else {
            _this.moreMes = false;
            _this.moreMessage = "点击加载更多";
          }
          if (_this.messageCount == _this.clkNum) {
            // //监听for循环 div 的高度
            _this.$nextTick(function() {
              _this.$refs.divHeight.scrollTop = _this.currentHeight;
            });
          } else {
            // Message("呵呵");
            _this.$refs.divHeight.scrollTop = 0;
            _this.clkNum = _this.messageCount;
          }
        })
        .catch(res => {
          // Message("网络延迟,请刷新")
        });
    },
    //发送信息
    sendMessage() {
      const _this = this;
      //发送之后聚焦
      _this.$refs.setfoucs.focus();
      //关闭表情模态框
      _this.closeEmojiul = false;
      //获取文本内容
      let usertext = _this.usertext.trim();
      let sendUuid = util.getCookie("uuid") || "";
      if (usertext) {
        //清楚定时器
        window.clearInterval(inter);
        //websocket开启连接
        if (ws.readyState != 1) {
          _this.openWs();
          _this.line();
        }
        //用户信息 表情字符串转换 url
        usertext = util.emojiReplace(usertext, _this.EmojiList);
        let params = { uuid: sendUuid, text: usertext };
        //发送失败测试
        // let params = { uuid: "112121212134325525235", text: usertext };
        //添加loading
        let newUserMessage = { tag: "0", message: usertext, loading: 3 };
        _this.initMessage.push(newUserMessage);
        _this.$nextTick(function() {
          if (_this.$refs.currentHeight) {
            //点击的时候获取重新获取 ul 的高度
            let currentHeight = _this.$refs.currentHeight.offsetHeight;
            // 点击的时候设置 div 的卷去高度
            _this.$refs.divHeight.scrollTop = currentHeight;
          }
        });
        params = { uuid: sendUuid, text: _this.usertext.trim() };
        classPost
          .sendMessage(params)
          .then(res => {
            window.clearInterval(inter);
            //生成本地时间
            let currentdate = new Date();
            let currentmin = currentdate.getHours();
            let currentsecond = currentdate.getMinutes();
            if (currentsecond < 10) {
              currentsecond = "0" + currentsecond;
            }
            let createTime = currentmin + ":" + currentsecond;
            // time_created
            //删除有loading的假信息
            for (let i = 0; i < _this.initMessage.length; i++) {
              if (
                _this.initMessage[i].loading == 3 &&
                this.initMessage[i].message == usertext
              ) {
                _this.initMessage.splice(i, 1);
              }
            }
            //用户信息添加到聊天信息
            usertext = util.emojiReplace(usertext, _this.EmojiList);
            let newUserMessage = {
              tag: "0",
              time_created: createTime,
              message: usertext,
              status: 1
            };
            _this.initMessage.push(newUserMessage);
            //监控新消息之后整体 div 的高度
            _this.$nextTick(function() {
              // //点击的时候获取重新获取 ul 的高度
              // let currentHeight = _this.$refs.currentHeight.offsetHeight;
              // // 点击的时候设置 div 的卷去高度
              // _this.$refs.divHeight.scrollTop = currentHeight;
              if (_this.$refs.currentHeight) {
                //点击的时候获取重新获取 ul 的高度
                let currentHeight = _this.$refs.currentHeight.offsetHeight;
                // 点击的时候设置 div 的卷去高度
                _this.$refs.divHeight.scrollTop = currentHeight;
              }
            });
            //倒计时功能
            let time = 900;
            inter = window.setInterval(function() {
              time--;
              // console.log(time);
              if (time == 300) {
                //生成本地时间
                let currentdate = new Date();
                let currentmin = currentdate.getHours();
                let currentsecond = currentdate.getMinutes();
                if (currentsecond < 10) {
                  currentsecond = "0" + currentsecond;
                }
                let createTimes = currentmin + ":" + currentsecond;
                let newUserMessage = {
                  tag: "1",
                  time_created: createTimes,
                  message: "我还有什么可以帮您的？如无需帮助，将在5分钟后自动断开连接。"
                };
                _this.initMessage.push(newUserMessage);
                //监控新消息之后整体 div 的高度
                _this.$nextTick(function() {
                  if (_this.$refs.currentHeight) {
                    //点击的时候获取重新获取 ul 的高度
                    let currentHeight = _this.$refs.currentHeight.offsetHeight;
                    // 点击的时候设置 div 的卷去高度
                    _this.$refs.divHeight.scrollTop = currentHeight;
                  }
                });
              } else if (time <= 0) {
                window.clearInterval(inter);
                ws.close();
                // console.log("关闭链接");
              }
            }, 1000);
          })
          .catch(res => {
            //删除有loading的假信息
            for (let i = 0; i < _this.initMessage.length; i++) {
              if (
                _this.initMessage[i].loading == 3 &&
                this.initMessage[i].message == usertext
              ) {
                _this.initMessage.splice(i, 1);
              }
            }
            usertext = util.emojiReplace(usertext, _this.EmojiList);
            let newUserMessage = { tag: "0", message: usertext, status: 2 };
            _this.initMessage.push(newUserMessage);
            //监控新消息之后整体 div 的高度
            _this.$nextTick(function() {
              // //点击的时候获取重新获取 ul 的高度
              // let currentHeight = _this.$refs.currentHeight.offsetHeight;
              // // 点击的时候设置 div 的卷去高度
              // _this.$refs.divHeight.scrollTop = currentHeight;
              if (_this.$refs.currentHeight) {
                //点击的时候获取重新获取 ul 的高度
                let currentHeight = _this.$refs.currentHeight.offsetHeight;
                // 点击的时候设置 div 的卷去高度
                _this.$refs.divHeight.scrollTop = currentHeight;
              }
            });
          });
      }
      _this.usertext = "";
    },
    //统计用户输入字数
    usertextCount() {
      const _this = this;
      var usertext = _this.usertext.trim();
      n = 0;
      for (var i = 0; i < usertext.length; i++) {
        if (usertext.charCodeAt(i) < 128) {
          n++;
        } else {
          n += 2;
        }
      }
      // console.log(n);
      if (n >= 480) {
        _this.promptText = true;
        _this.disable = true;
      } else {
        _this.promptText = false;
        _this.disable = false;
      }
    },
    //重新发送消息
    // reloadMes(event) {
    //   const _this = this;
    //   let p = event.currentTarget.parentNode.children[1];
    //   // console.log(p.innerHTML);
    //   for (let i = 0; i < _this.initMessage.length; i++) {
    //     if (
    //       _this.initMessage[i].status == 2 &&
    //       this.initMessage[i].message == p.innerHTML
    //     ) {
    //       let sendUuid = util.getCookie("uuid") || "";
    //       let params = { uuid: sendUuid, text: _this.initMessage[i].message };
    //       classPost
    //         .sendMessage(params)
    //         .then(res => {
    //           let currentdate = new Date();
    //           let currentmin = currentdate.getHours();
    //           let currentsecond = currentdate.getMinutes();
    //                if(currentsecond<10){
    //   currentsecond= '0' + currentsecond
    // }
    //           let createTime = currentmin + ":" + currentsecond;
    //           //用户信息添加到聊天信息
    //           _this.initMessage[i].messag = util.emojiReplace(
    //             _this.initMessage[i].message,
    //             _this.EmojiList
    //           );
    //           let newUserMessage = {
    //             tag: "0",
    //             time_created: createTime,
    //             message: _this.initMessage[i].message,
    //             status: 1
    //           };
    //           _this.initMessage.push(newUserMessage);
    //           //删除没有成功的消息
    //           _this.initMessage.splice(i, 1);
    //           // console.log(res);
    //           //监控新消息之后整体 div 的高度
    //           _this.$nextTick(function() {
    //             // //点击的时候获取重新获取 ul 的高度
    //             // let currentHeight = _this.$refs.currentHeight.offsetHeight;
    //             // // 点击的时候设置 div 的卷去高度
    //             // _this.$refs.divHeight.scrollTop = currentHeight;
    //             if (_this.$refs.currentHeight) {
    //               //点击的时候获取重新获取 ul 的高度
    //               let currentHeight = _this.$refs.currentHeight.offsetHeight;
    //               // 点击的时候设置 div 的卷去高度
    //               _this.$refs.divHeight.scrollTop = currentHeight;
    //             }
    //           });
    //         })
    //         .catch(res => {
    //           _this.initMessage[i].messag = util.emojiReplace(
    //             _this.initMessage[i].message,
    //             _this.EmojiList
    //           );
    //           let newUserMessage = {
    //             tag: "0",
    //             message: _this.initMessage[i].message,
    //             status: 2
    //           };
    //           _this.initMessage.push(newUserMessage);
    //           //监控新消息之后整体 div 的高度
    //           _this.$nextTick(function() {
    //             if (_this.$refs.currentHeight) {
    //               let currentHeight = _this.$refs.currentHeight.offsetHeight;
    //               _this.$refs.divHeight.scrollTop = currentHeight;
    //             }
    //           });
    //         });
    //       return;
    //     }
    //   }
    // },
    //获取表情列表
    getEmoji() {
      const _this = this;
      if (_this.EmojiList == "") {
        classPost
          .getEmojiList()
          .then(res => {
            _this.closeEmojiul = true;
            _this.$nextTick(function() {
              let height = document.documentElement.clientHeight;
              _this.$refs.closeEmojis.style.height = height + "px";
            });
            // 获取表情列表
            _this.EmojiList = res.data.list;
            //显示表情列表
            _this.EmojiShow = true;
          })
          .catch(res => {
            _this.closeEmojiul = false;
            // console.log("表情列表报错");
          });
      } else {
        _this.closeEmojiul = true;
        //显示表情列表;
        _this.$nextTick(function() {
          let height = document.documentElement.clientHeight;
          if (_this.$refs.closeEmojis) {
            _this.$refs.closeEmojis.style.height = height + "px";
          }
        });
        _this.EmojiShow = true;
      }
    },
    //点击关闭表情框
    closeEmojic() {
      const _this = this;
      _this.EmojiShow = false;
      _this.closeEmojiul = false;
    },
    //表情添加到 input 框
    addEmoji(item) {
      const _this = this;
      // 拼接输入框内容与表情的 alt
      let emoji = item.image_path;
      var userStr = this.usertext;
      var userArr=userStr.split('');  
      userArr.splice(_this.$refs.setfoucs.selectionStart,0,item.emoji); 
      _this.usertext=userArr.join(''); 
      // _this.usertext = _this.usertext + item.emoji;
      //隐藏表情列表
      _this.EmojiShow = false;
      //表情背景框
      _this.closeEmojiul = false;
      //聚焦input框
      _this.$refs.setfoucs.focus();
      // console.log(_this.usertext);
    },
    //ws-定时器
    line() {
      const _this = this;
      const timer = window.setInterval(_this.keepLink, 10000);
    },
    //ws-保持连接
    keepLink() {
      //console.log('test');
      //是否已断开链接
      //  (0)：表示还没建立连接；
      //  (1)： 已经建立连接，可以进行通讯；
      //  (2)：通过关闭握手，正在关闭连接；
      //  (3)：连接已经关闭或无法打开；
      if (ws) {
        if (ws.readyState == 3) {
          // console.log("该客服连接中断，请关闭窗口重试。");
          //关闭其他操作
        } else {
          ws.send("{'url': '/chat/heart-beat','chat_token': 'abc'}");
          // console.log("长连接");
        }
      }
    },
    enlarge(event) {
      const _this = this;
      _this.imgBigUrl = event.currentTarget.src;
      _this.$nextTick(function() {
        let height = document.documentElement.clientHeight;
        _this.$refs.imgBigref.style.height = height + "px";
      });
    },
    //关闭图片放大框
    closeBigImg() {
      const _this = this;
      _this.imgBigUrl = "";
    },
    //处理输入法
    Typewriting() {
      const _this = this;
      setTimeout(function() {
        let setfoucs = _this.$refs.setfoucs;
        setfoucs.scrollIntoView(true);
        setfoucs.scrollIntoViewIfNeeded();
      }, 200);
    },
    currenthave() {
      const _this = this;
      _this.$emit("ievent", true);
    }
  },
  created() {
    const _this = this;
    //初始化聊天窗口
    _this.connectInit();
    // ws连接心跳
    _this.line();
  },
  mounted() {
    const _this = this;
    _this.$nextTick(function() {
      let heights = document.documentElement.clientHeight;
      _this.$refs.divHeight.style.height = heights - 140 - 42 - 10 + "px";
      if (_this.$refs.mesLoading) {
        _this.$refs.mesLoading.style.height = heights - 60 - 10 + "px";
      }
    });
  }
};
</script>
<style scoped>
@import "../assets/css/char.css";
</style>