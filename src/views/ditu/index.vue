<template>
  <div id="mapContain" class="mapContain"></div>
</template>

<script setup>
// import { loadBmap } from '@/utils/loadBmap'
import { getInfoList } from '@/service/user'
import { onMounted } from 'vue'
let bmap
onMounted(async () => {
  bmap = window.BMap
  const map = new bmap.Map('mapContain')
  map.disableKeyboard() // 禁用键盘操作地图
  map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
  map.addControl(new bmap.NavigationControl())
  map.addControl(new bmap.ScaleControl())
  map.addControl(new bmap.OverviewMapControl())
  map.addControl(new bmap.MapTypeControl())
  const point = new bmap.Point(109.219792, 34.368658) // 创建点坐标
  map.centerAndZoom(point, 15)

  const res = await getInfoList('西安事变')
  res.forEach(element => {
    const point = new bmap.Point(element.longitude, element.latitude)
    const marker = new bmap.Marker(point) // 创建标注
    const icon = new bmap.Icon('images/hongqi.png', new bmap.Size(40, 40), {
      anchor: new bmap.Size(0, 0),
    })
    marker.setIcon(icon)
    map.addOverlay(marker) // 将标注添加到地图中
    marker.addEventListener('click', function (item) {
      const opts = {
        width: 0, // 信息窗口宽度
        height: 0, // 信息窗口高度
        title: element.incident, // 信息窗口标题
      }
      const infoWindow = new bmap.InfoWindow(
        `<p class='text'>${element.text}</p>`,
        opts
      ) // 创建信息窗口对象

      map.openInfoWindow(infoWindow, item.point) // 打开信息窗口
    })
  })
})
</script>

<style scoped lang="scss">
.mapContain {
  height: calc(100vh - 70px);
  ::v-deep(.text) {
    width: 200px;
    height: 200px;
    overflow: auto;
  }
}
</style>
