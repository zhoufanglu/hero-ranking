<script setup lang="ts">
  import { login } from '@/service/api/modules/users'
  import { ElMessage } from 'element-plus'

  const variables = reactive({
    dialogVisible: false,
    qq: '',
  })

  const userStore = useUserStore()
  const handleLogin = async () => {
    if (variables.qq) {
      const { data } = await login({ qq: variables.qq })
      if (data.name) {
        ElMessage.success('登录成功')
        variables.dialogVisible = false
        // 登录成功
        userStore.setUserInfo({
          id: data.id,
          isAdmin: data.isAdmin,
          name: data.name,
          qq: data.qq,
        })
      }
    }
  }
</script>
<template>
  <div class="login-info">
    <el-button v-if="!userStore.userInfo.name" size="small" @click="variables.dialogVisible = true"
      >立即登录</el-button
    >
    <span v-else style="margin-left: 20px">
      {{ userStore.userInfo.name }}
      <el-button size="small" style="margin-left: 10px" @click="userStore.logout()">注销</el-button>
    </span>
  </div>
  <el-dialog v-model="variables.dialogVisible" title="登录" width="468px">
    <el-form-item label="qq号:">
      <el-input v-model.trim="variables.qq"></el-input>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="variables.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
  .login-info {
    font-size: 14px;
  }
</style>
