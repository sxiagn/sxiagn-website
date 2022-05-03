<template>
  <div class="container">
    <div class="bg">
      <div class="login-wrap">
        <el-form ref="ruleFormRef" class="login-form" :model="ruleForm" :rules="rules" label-position="top">
          <el-form-item label="账号" prop="userName">
            <el-input v-model="ruleForm.userName" />
          </el-form-item>
          <el-form-item label="密码" prop="password" class="password">
            <el-input v-model="ruleForm.password" @keyup.enter="handleSubmit(ruleFormRef)" />
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handleSubmit(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import AESUTIL from '../utils/crypto';
import { userLogin } from '../api/index';
import { useInfoStore } from '../store/user-info';

const router = useRouter();
const userInfoStore = useInfoStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  userName: '',
  password: ''
});

const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      const params = {
        userName: AESUTIL.encrypte(ruleForm.userName),
        password: AESUTIL.encrypte(ruleForm.password)
      };
      const { data } = await userLogin(params);
      userInfoStore.setTokenTolocal(data);
      router.push('/index');
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  padding-top: 30px;
  .bg {
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .login-wrap {
      width: 60%;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0px 8px rgba($color: #000000, $alpha: 0.2);

      .login-form {
        width: 100%;
        .password {
          margin-bottom: 24px;
        }
      }
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
