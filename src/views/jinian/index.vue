<template>
  <div class="context">
    <div class="jinian_img">
    <el-carousel height="500px" indicator-position="outside">
      <el-carousel-item v-for="item in imgList" :key="item">
        <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
        <img :src="item" style="position: relative;top: -320px;" alt="">
      </el-carousel-item>
    </el-carousel>
</div>
    <!-- <div class="jinian_img">
      <h1>西安事变旧址</h1>
      <p>西安事变旧址主要集中于城中心区域的青年路和建国路上，另有一处位于华清池。旧址分为张学良公馆、杨虎城将军纪念馆和五间厅三大部分，包括西安事变指挥部、新城黄楼、止园、高桂滋公馆、西京招待所、华清池五间厅、兵谏亭等8处。主要看点有中共代表住处、西安事变纪念馆、会议室、西安八路军办事处旧址、杨虎城别墅等。在各个馆址内，分别陈列了“张学良将军生平展”、“杨虎城将军生平展”和“西安事变史实陈列”等，并对旧时场景进行了复原。游客既可以看到展览，又可以参观卧室、会客室等旧址风貌。</p>
    </div>
    
    <div  class="jinian_img">
      <h1>西安事变纪念馆</h1>
      <div>地址：陕西省西安市碑林区建国路69号</div>
      <div>坐标：108.974159,34.263485</div>
      西安事变纪念馆（张学良公馆）位于西安市建国路69号，始建于民国二十一年（1932年），为东西排列的三座三层砖木结构西式楼房，东楼是机要楼，中楼有客厅、会议室，西楼为张学良的居室。西安事变发生后，周恩来、叶剑英率中共代表团住东楼。中共代表团与张、杨会谈及与南京政府代表谈判多在中楼。

    </div> -->

    <div class="jinian_img" style="display: flex;">
      
      <div class="jinian_left">
        <div class="tilte" style="">
          纪念馆简介
        </div>
        <div :key="item" class="wrapper" 
              v-for="(item, index) in ['西安事变旧址','西安事变纪念馆']">
          <div class="item" @click="hanldeClick(index)">{{ item }}</div>
        </div>
      </div>
      <div  class="jinian_right">
        <h2 style="color: rgb(64 64 64);" class="font">
          {{ textList[currentIndex].tilte }}
        </h2>
        <p class="text font">
          {{ textList[currentIndex].content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { getInfoList } from '@/service/user'
import {  ref } from 'vue'

const imgList = ref([
require('@/assets/images/lishi.jpg'),
require('@/assets/images/beijing.jpg'),
require('@/assets/images/qiang.jpg'),
require('@/assets/images/jinian1.jpg')
])

const textList = ref([
  {tilte: '西安事变旧址', content: '西安事变旧址主要集中于城中心区域的青年路和建国路上，另有一处位于华清池。旧址分为张学良公馆、杨虎城将军纪念馆和五间厅三大部分，包括西安事变指挥部、新城黄楼、止园、高桂滋公馆、西京招待所、华清池五间厅、兵谏亭等8处。主要看点有中共代表住处、西安事变纪念馆、会议室、西安八路军办事处旧址、杨虎城别墅等。在各个馆址内，分别陈列了“张学良将军生平展”、“杨虎城将军生平展”和“西安事变史实陈列”等，并对旧时场景进行了复原。游客既可以看到展览，又可以参观卧室、会客室等旧址风貌。'
   
},
{
  tilte: '西安事变纪念馆', content:'西安事变纪念馆（张学良公馆）位于西安市建国路69号，始建于民国二十一年（1932年），为东西排列的三座三层砖木结构西式楼房，东楼是机要楼，中楼有客厅、会议室，西楼为张学良的居室。西安事变发生后，周恩来、叶剑英率中共代表团住东楼。中共代表团与张、杨会谈及与南京政府代表谈判多在中楼。'
}
])

const currentIndex = ref(0)

const hanldeClick = (index)=> {
  console.log(index);

  currentIndex.value = index
}
</script>

<style scoped lang="scss">
.context {
  height:100vh;
  background-image: url(https://www.xabwy.com/images/bg_home.jpg);
  overflow-x: hidden;
  overflow-y: auto;
}
.jinian_left{
  // width: 200px;
  // background-color: #fff;
  // height: 300px;
  text-align: center;

  .tilte{
    margin-bottom: 4px;
    background: #a21f26;
    color: #dbbf95;
    font-size: 20px;
    padding: 15px 0;
    font-weight: 800;
  }
  .item{
    background-color: #fff;
    // text-align: center;
    width: 150px;
    padding: 10px 0;
    border-bottom: 1px solid #aaa;
    cursor: pointer;
  } 
  .item:hover{
    background-color: #f1f1f1;
  }
}

.jinian_right{
  width: 100%;
  height: 300px;
  background-color: #fff;
  margin-left: 22px;
  padding: 0  25px;

  .text {
    color: #666;
    line-height: 28px;
    text-indent: 2em;
    font-size: 18px;
  }
}

.font{
  font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;

}
.wrapper:last-child .item{
    border-bottom: none;
  }
.jinian_img{
  margin:0 auto;
  width: 1500px;
}

</style>
