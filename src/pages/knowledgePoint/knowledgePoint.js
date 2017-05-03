import './knowledgePoint.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

new Vue({
  el: '#body',
  data: {
    typeStatus: 0,
    typeFirst: true,
    typeSecond: false,
    typeThird: false,
    typeForth: false
  },
  computed:{
  },
  created() {
  },
  methods:{
    changeTab(index){
      if( index == 0 ){
        this.typeFirst = !this.typeFirst;
      }else if( index == 1 ){
        this.typeSecond = !this.typeSecond;
      }else if( index == 2 ){
        this.typeThird = !this.typeThird;
      }else{
        this.typeForth = !this.typeForth;
      }
    }
  },
  components: {
  },
})     