import './vwvh.scss'

import Slide from 'components/slide/slide.vue'
// import mixin from 'js/mixin.js'

// mock测试数据：轮播模拟数据
import {slideList} from 'mock/mock.js'
import addWheelListener from 'js/addWheelListener.js'
import { getUrlParam, setCookie, getCookie } from 'js/common.js'

new Vue({
  el: '#body',
  data: {
    slideList,
    isLogin:false,
    loginUrl:'',//
    clientHeight: document.documentElement.clientHeight,
    clientWidth: document.documentElement.clientWidth
  },
  created() {
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight
      this.clientWidth = document.documentElement.clientWidth
    }
  },
  methods: {
  },
  components: {
    Slide
  },
  // mixins: [mixin]
})

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
      // body.style.top= -nextEl.offsetTop + 'px';
      // console.log(nextEl.offsetTop);
      animate(body,{top:-nextEl.offsetTop},20)
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
      // body.style.top= -prevEl.offsetTop + 'px';
      animate(body,{top:-prevEl.offsetTop},20)
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
function animate(obj, json, interval, fn) {
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
            var speed = (json[arr] - icur) * 0.1;
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


