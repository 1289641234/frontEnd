<template>
  <div class="context">
    <el-input
      size="default"
      placeholder="请输入查询名称"
      v-model="searchValue"
      style="max-width: 180px"
    >
    </el-input>
    <el-button size="default" type="primary" class="ml10" @click="handleSearch">
      查询
    </el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in userList"
        :key="index"
        :prop="item"
        :label="item"
      />

      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick()"
            >删除</el-button
          >
          <!-- <el-button link type="primary" size="small">Edit</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { DelUserList, getUserList } from '@/service/user'
import { onMounted, ref } from '@vue/runtime-core'

const handleClick = id => {
  console.log('click', id)

  DelUserList
}

const searchValue = ref('')
const userList = ref([])

const tableData = ref([])
const init = async () => {
  const res = await getUserList()
  // console.log(res);
  tableData.value = res

  for (const key in res[0]) {
    userList.value.push(key)
  }

  console.log(userList)
}
init()
onMounted(() => {})
</script>

<style scoped lang="scss">
.context {
  height: calc(100vh - 70px);
  background-image: url(https://www.xabwy.com/images/bg_home.jpg);
}
</style>
