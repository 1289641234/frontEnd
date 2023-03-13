<template>
  <div class="head">
    <div class="head_left">
      <div class="head_title">传统村落网站</div>
      <div
        v-for="(item, index) in headMenu"
        :key="index"
        class="head_menu"
        :class="{ head_menu_active: currentIndex == index }"
        @click="handleClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="head_right">
      <div class="login" @click="login">{{ loginState }}</div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" :title="title" width="40%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div class="register" @click="jump">没账号? 立即注册!</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 登录 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { router } from '@/router'
import { login as loginService } from '@/service/login'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import Cookies from 'js-cookie'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
const loginState = ref('登录')
const store = useStore()
const loginOrRegister = ref('login')
const dialogVisible = ref(false)
const currentIndex = ref(store.state.global.headIndex)
const ruleForm = ref({
  username: 'admin',
  pass: '123',
})
// const headMenu = ref(['首页', '地图故事', '纪念馆', '事件报道', '关于平台'])
const headMenu = ref(['村落介绍','全景展示','历史文化','民俗文化'])
watch(
  () => store.state.global.headIndex,
  newValue => {
    currentIndex.value = newValue
  }
)
watch(
  () => store.state.router.routes,
  newValue => {
    const headMenuTemp = []
    newValue.forEach(element => {
      if (element.name) {
        headMenuTemp.push(element.name)
      }
    })
    headMenu.value = headMenuTemp
  }
)
const ruleFormRef = ref()

onMounted(() => {
  const userInfo = Cookies.get('userInfo')

  if (userInfo) {
    login2(JSON.parse(userInfo))
  }
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.value.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const title = computed(() => {
  return loginOrRegister.value == 'login' ? '登录' : '注册'
})

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.value.username) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [{ validator: validatePass2, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const login = () => {
  if (loginState.value == '登录') {
    dialogVisible.value = true
  } else {
    console.log('您已登录')
  }
}
const handleClick = index => {
  store.dispatch('global/changeHeadIndex', index)
  // currentIndex.value = index;

  const routers = [
    '/index',
    '/ditu',
    '/jinian',
    '/baodao',
    '/about',
    '/shuju',
    '/yonghu',
  ]

  //   const routers = [
  //     'index',
  //     'ditu',
  //     'hiscul',
  //     'peocul',
  // ]

  router.push(routers[index])
}

const confirm = async () => {
  const res = await loginService({
    username: ruleForm.value.username,
    password: ruleForm.value.pass,
  })

  if (res && res.code == 200) {
    Cookies.set('userInfo', JSON.stringify(res))
    store.commit('router/setUserInfo', res)
    login2(res)
  }
}

const login2 = res => {
  if (res.name == 'admin') {
    store.dispatch('router/generateRoutes', res.name)
    dialogVisible.value = false
    loginState.value = '已登录'
  } else {
    console.log('用户权限不为admin')
    ElMessageBox.alert(res.message, 'Title', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'OK',
      callback: action => {
        ElMessage({
          type: 'info',
          message: `action: ${action}`,
        })
      },
    })
  }
}

const jump = () => {
  loginOrRegister.value =
    loginOrRegister.value == 'login' ? 'register' : 'login'
  console.log(loginOrRegister.value)
}
</script>

<style lang="scss" scoped>
.head {
  height: 55px;
  background: #a21f26;
  color: #dbbf95;
  justify-content: space-around;
  display: flex;
  width: 100%;
  .head_left {
    display: flex;
    height: 100%;
    .head_title {
      font-size: 25px;
      line-height: 55px;
      padding: 0 15px;
    }
  }
  .head_menu {
    line-height: 55px;
    padding: 0 10px;
    cursor: pointer;
  }
  .head_menu:hover {
    background-color: #006591;
  }
  .head_menu_active {
    // line-height: 70px;
    font-weight: 600;
    background-color: #006591;
  }

  .head_right {
    padding-right: 20px;
    .login {
      line-height: 55px;
      cursor: pointer;
    }
    .login:active {
      color: #ccc;
    }
  }
}
.register {
  float: right;
  cursor: pointer;
  color: var(--el-color-primary);
}
.register {
  float: right;
  cursor: pointer;
  color: var(--el-color-primary);
}

.register:active {
  color: var(--el-color-primary-dark-2);
}
</style>
