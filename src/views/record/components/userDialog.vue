<script setup lang="ts">
  import { insertUser } from '@/service/api/modules/users'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

  const variables = reactive({
    dialogVisible: false,
    btnLoading: false,
    form: {
      name: '',
      qq: '',
    },
    rules: {
      name: [{ required: true, message: '请输入入口名称', trigger: 'blur' }],
      qq: [{ required: true, message: '请输入qq号', trigger: 'blur' }],
    } as FormRules,
  })

  const UserFormRef = ref<FormInstance>()
  const emit = defineEmits(['refreshUserList'])

  const openDialog = () => {
    variables.dialogVisible = true
    nextTick(() => {
      UserFormRef.value!.resetFields()
    })
  }

  const confirm = async () => {
    UserFormRef.value!.validate((valid) => {
      if (!valid) {
        return
      } else {
        ;(async () => {
          try {
            variables.btnLoading = true
            await insertUser({
              name: variables.form.name,
              qq: variables.form.qq,
            })
            variables.dialogVisible = false
            emit('refreshUserList')
            ElMessage.success('添加成功')
          } catch (e) {
            console.log(e)
          } finally {
            variables.btnLoading = false
          }
        })()
      }
    })
  }

  defineExpose({
    openDialog,
  })
</script>
<template>
  <el-dialog
    v-model="variables.dialogVisible"
    :append-to-body="true"
    width="468"
    class="entry-dialog"
    title="新增用户"
  >
    <!--?body-->
    <el-form ref="UserFormRef" label-width="85px" :model="variables.form" :rules="variables.rules">
      <el-form-item label="名字:" prop="name">
        <el-input v-model="variables.form.name" />
      </el-form-item>
      <el-form-item label="qq号:" prop="qq">
        <el-input v-model="variables.form.qq" />
      </el-form-item>
    </el-form>
    <!-- ?footer -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="variables.dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="variables.btnLoading" @click="confirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
