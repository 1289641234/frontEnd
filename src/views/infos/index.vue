<template>
  <div class="context">
    <div class="left-text"></div>
    <div class="right-timeline">
      <el-steps :active="active" align-center finish-status="process">
        <el-step
          v-for="(item, index) in stepItem"
          :key="index"
          :title="item.incident"
          @click="showInformation(item)"
        >
          <template #description>
            <el-image
              style="width: 100px; height: 100px"
              :src="item.imageUrl"
              fit="fill"
            />
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
  
</template>

<script setup>
import { getInfoList } from '@/service/user'
import { onMounted, ref } from 'vue'
const active = ref(0)
const stepItem = ref([])
onMounted(async () => {
  const res = await getInfoList('西安事变')
  stepItem.value = res
})

setInterval(() => {
  if (active.value++ > stepItem.value.length) active.value = 0
}, 2000)

const showInformation = res => {
  console.log(res)
}
</script>

<style scoped lang="scss">
.context {
  height: calc(100vh - 70px);
  // background-image: url(https://www.xabwy.com/images/bg_home.jpg);
  display: flex;
  .left-text {
    width: 30%;
  }
  .right-timeline {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.el-step__main) {
      display: flex;
      flex-direction: column-reverse;
      margin: 10px;
    }
  }
}
</style>
