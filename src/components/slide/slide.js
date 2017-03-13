import './slide.scss'

let vm = {
  props: {
    slideList: {
      type: Array,
      required: true
    },
    width: {
      required: true
    }, 
    height: {
      required: true
    },
    play: {

    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null,
      newWidth: this.width.toString().indexOf('%') ? this.width: this.width+'px'
      // slideist
    }
  },
  created() {
    // 自动轮播
    if(this.play !== 'false'){
      this.go();  
    }

  },
  methods: {
    change(index) {
      this.currentIndex = index
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null
    },
    go() {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    autoPlay() {
      this.currentIndex = this.currentIndex + 1
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0
      }
    }
  }
}

export {
  vm
}
