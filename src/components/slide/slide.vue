<template>
  <div class="slide-container">
    <transition-group 
    name="slide" 
    tag="ul" 
    class='slideUl' 
    :style="{'height':height+'px'}">
      <li v-show='index === currentIndex' v-for='(slide,index) in slideList' :key="index" :style="{'width':newWidth}">
        <a :href="slide.clickUrl?slide.clickUrl:'javascript:;'">
          <img :src="slide.image"  @mouseenter='stop' @mouseleave='go' :width="width" :height="height" v-if="play !== 'false'">
          <img :src="slide.image" :width="width" :height="height" v-if="play === 'false'">
        </a>
      </li>
    </transition-group>   
    <div class="carousel-items">
      <span  :class="{'active': span-1 === currentIndex}" @mouseover='change(span-1)' v-for='span in slideList.length' :key="span">
      </span>
    </div>
  </div>
</template>

<script>
  import {vm} from './slide.js'
  export default vm

</script>

