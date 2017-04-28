import './turnTable.scss'

new Vue({
  el: '#body',
  data: {
    color:["#626262","#787878","rgba(0,0,0,0.5)","#DCC722","white","#FF4350"],
  },
  computed:{
  },
  created() {
    this.canvasRun()
  },
  methods:{
    canvasRun(){
      // 变量
      var canvas = document.querySelector('.turn_table_box')
      var ctx = canvas.getContext('2d')
      this.createCircle()
      this.createCirText()
      this.initPoint()
      
    },
    // 外圆
    createCircle(){
      let startAngle = 0 //扇形的开始弧度
      let endAngle = 0 //扇形的结束弧度
      // 画一个8等份扇形的圆形
      for(let i = 0; i<8; i++){
        this.startAngle = Math.PI*(i/4-i/8)
        this.endAngle = Math.PI*(i/4)
        this.ctx.save() //保存当前的
        this.ctx.beginPath()
        this.ctx.arc(150, 150, 100, startAngle, endAngle)
        this.ctx.lineWideth = 120
        if(i%2 == 0){
          this.ctx.strokeStyle = color[0]
        }else{
          this.ctx.strokeStyle = color[1]
        }
        this.ctx.stroke()
        this.ctx.restore()()

      }
    },
    // 奖项
    createCirText(){

    },
    // 小零件
    initPoint(){

    },
  },
  components: {
  },
})