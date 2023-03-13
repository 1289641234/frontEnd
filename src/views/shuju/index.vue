<template>
  <div class="context">
    <el-select
      size="default"
      style="width: 100px"
      v-model="optionValue"
      placeholder="请选择"
      class="ml10"
    >
      <el-option
        v-for="item in ['西安事变']"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-input
      size="default"
      placeholder="请输入查询名称"
      v-model="searchValue"
      style="max-width: 180px"
    >
    </el-input>
    <el-button size="default" type="primary" class="ml10" @click="handleSearch">
      <!-- <el-icon>
        <ele-Search />
      </el-icon> -->
      查询
    </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in userList"
        :key="index"
        :prop="item"
        :label="item"
        show-overflow-tooltip
      />

      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >删除
          </el-button>
          <!-- <el-button link type="primary" size="small">Edit</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getInfoList } from '@/service/user'
import { ref, watch } from '@vue/runtime-core'

const handleClick = () => {
  console.log('click')
}

const userList = ref([])

const tableData = ref([])

const searchValue = ref([])

const optionValue = ref('西安事变')

const handleSearch = () => {}

const init = async () => {
  const res = await getInfoList(optionValue.value)
  // console.log(res);
  tableData.value = res
  userList.value = []
  for (const key in res[0]) {
    userList.value.push(key)
  }

  console.log(userList)
}
init()
watch(optionValue, () => {
  init()
})
</script>

<style scoped lang="scss">
.context {
  height: calc(100vh - 70px);
  background-image: url(https://www.xabwy.com/images/bg_home.jpg);
}
</style>
