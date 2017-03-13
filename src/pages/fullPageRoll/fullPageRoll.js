import './fullPageRoll.scss'

import Slide from 'components/slide/slide.vue'
// import mixin from 'js/mixin.js'

// mock测试数据：轮播模拟数据
import {slideList} from 'mock/mock.js'

// import LoginService from 'commonJS/service/login.js'
import { rap ,fetch, getUrlParam, setCookie, getCookie } from 'js/common.js'
import addWheelListener from 'js/addWheelListener.js'
let url = {
  goodsClassifyList:'/berkeley/goodsClassifyList.do',//产品分类列表
  collection:'/berkeleyCollection/list.do',//用户收藏列表
  getUser:'/user/getUser.do',//获取个人资料
  classifyList:'/berkeley/goodsShowList.do',//首页产品展示
  slideList:'/berkeley/indexSlideList.do',//首页轮播图
  indexSetting:'/berkeley/indexSetting.do',//首页设置--品牌故事两段文字、伯克丽文字,链接、品牌定位图片,链接
  berkeleySlideList:'/berkeley/berkeleySlideList.do',//伯克利轮播
  recordEmail:'/berkeley/recordEmail.do',//首页记录邮箱
}
url = rap(url)
let isLogin = JSON.parse(sessionStorage.getItem('isLogin'))//

new Vue({
  el: '#body',
  data: {
    slideList:[],
    berkeleySlideList:[],//伯克利轮播
    clientHeight: document.documentElement.clientHeight,
    clientWidth: document.documentElement.clientWidth,
    isLogin:isLogin,//判断用户是否登录
    loginUrl:'',//
    keywords:'',//搜索关键字
    goodsClassifyList:null,//分类列表
    collectionTotal:0,//收藏个数
    userName:'',
    sex:'',//性别
    uri:location.href,
    classifyList:null,//分类列表
    goodsListActive:0,//当前分类索引
    berkeleyText:'',//  伯克丽文字描述
    berkeleyUrl:'',//
    localImage:'',//品牌定位图片
    localUrl:'',
    storyOne:'',//品牌故
    storyTwo:'',//
    isMessageShow:true, // 是否展示最新资讯
    recordEmail:'',
    emailMsg:''
  },
  computed:{
    goodsList() {
      let classifyList = this.classifyList;
      if(classifyList&&classifyList.length>0) {
        return classifyList[this.goodsListActive].goodsList.filter((e,i,a)=>{
          return i<4
        })
      }
    }
  },
  created() {
    this.loginUrl='login.html?fromUrl='+location.href
    this.getData()
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight
      this.clientWidth = document.documentElement.clientWidth
    }
  },
  methods:{
    //查询
    search() {
      if(!this.keywords) return;
      location.href = 'classifyLists.html?keywords='+this.keywords;
    },
    //获取分类列表
    getData() {
      //分类列表
      fetch(url.goodsClassifyList).then(res=>{
        this.goodsClassifyList = res.data.classifyList;
      })
      //收藏数量
      let collection = JSON.parse(localStorage.getItem('collection'));
        if(collection) {
          this.collectionTotal = collection.length;
        }else {
          fetch(url.collection).then(res=>{
            this.collectionTotal = res.data.list.length;
          })
        }
      //用户信息
      if(this.isLogin) {
        console.log(this.isLogin);
        let sexList=['','男士','女士']
        fetch(url.getUser).then(res=>{
          this.userName = res.data.user.name;
          this.sex = sexList[res.data.user.sex]
        })
      }
      //轮播图
      fetch(url.slideList).then(res=>{
        this.slideList = res.data.list;
      })
      fetch(url.berkeleySlideList).then(res=>{
        this.berkeleySlideList = res.data.list
      })
      // 首页产品展示
      fetch(url.classifyList,{size:5}).then(res=>{
        this.classifyList = res.data.classifyList
      })
      fetch(url.indexSetting).then(res=>{
        this.berkeleyText = res.data.berkeleyText
        this.berkeleyUrl = res.data.berkeleyUrl
        this.localImage = res.data.localImage
        this.localUrl = res.data.localUrl
        this.storyOne = res.data.storyOne
        this.storyTwo = res.data.storyTwo
      })
    },
    changeActiveIndex(index) {
      this.goodsListActive = index
    },
    verify() {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if(!filter.test(this.recordEmail)) {
        this.emailMsg = '邮箱格式不正确'
      }else {
        this.emailMsg = "";
      }
    },
    //提交邮箱
    submitEmail() {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if(!filter.test(this.recordEmail)) {
        this.emailMsg = '邮箱格式不正确'
        return
      }
      fetch(url.recordEmail,{email:this.recordEmail}).then(res=>{
        console.log(res.message);
        this.emailMsg = "邮箱提交成功"
      })
    }
  },
  components: {
    Slide
  },
  // mixins: [mixin]
})
// let clientHeight = document.documentElement.clientHeight;
// let body = document.getElementById('body');
window.onload=function (argument) {
  let clientHeight = document.documentElement.clientHeight;
  let body = document.getElementById('body');

  let flag = true ;
  addWheelListener(body,function (e) {
    if(!flag) return;
    let current = document.querySelector('.page_active'),
        nextEl = nextElem(current),
        prevEl = prevElem(current);
    if(e.deltaY>0) {
      if(!nextEl) return;
      body.style.top= -nextEl.offsetTop + 'px';
      current.classList.remove('page_active');
      nextEl.classList.add('page_active')
      // current.style.top = 0;
      flag = false;
      setTimeout(function() {
        flag = true;
      },500)
    }
    if(e.deltaY<0) {
      if(!prevEl) return;
      body.style.top= -prevEl.offsetTop + 'px';
      current.classList.remove('page_active');
      // current.style.top = 0;
      prevEl.classList.add('page_active')

      flag = false;
      setTimeout(function() {
        flag = true;
      },500)
    }
  })
}
function prevElem(elem){
  if(!elem) return;
   while((elem=elem.previousSibling)){
      if(elem.nodeType==1){
          return elem;
      }
   }
}

function nextElem(elem) {
  if(!elem) return;
  let nodes = [];
  while((elem=elem.nextSibling)){
      if(elem.nodeType==1){
        // nodes.push(elem)
        return elem;
      }
   }
  // return nodes;
}

function getStyle(obj, arr) {
  if(obj.currentStyle){
      return obj.currentStyle[arr];    //针对ie
  } else {
      return document.defaultView.getComputedStyle(obj, null)[arr]; 
  }
}
function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer);
    //var k = 0;
    //var j = 0;
   
    obj.timer = setInterval(function(){
        //j ++;
        var flag = true;
        for(var arr in json) {
            var icur = 0;
            //k++;
            if(arr == "opacity") {
                icur = Math.round(parseFloat(getStyle(obj, arr))*100);
            } else {
                icur = parseInt(getStyle(obj, arr));
            }
            var speed = (json[arr] - icur) * sp;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            if(icur != json[arr]){
                flag = false;
            } 
            if(arr == "opacity"){
                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                obj.style.opacity = (icur + speed)/100;
            }else {
                obj.style[arr] = icur + speed + "px";
            }
            //console.log(j + "," + arr +":"+ flag);
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },interval);
}
