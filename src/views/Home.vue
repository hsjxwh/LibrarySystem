<template>
  <el-row>
    <el-col :span="24">
      <div class="top-bar" style="height: 60px; background-color: #3a0783">
        <div class="top-content">
          <div class="title">图书馆借阅系统</div>
        </div>
      </div>
    </el-col>
  </el-row>
  <div class="at-center">
    <el-dialog
      v-model="centerDialogVisible"
      :center="true"
      width="500"
      class="custom-dialog"
      :closable="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-tabs type="border-card" class="custom-tabs">
        <el-tab-pane label="用户登录">
          <div class="form-container">
            <div class="input-item">
              <label class="label-text">账号:</label>
              <input v-model="id" type="text" class="input-control" placeholder="请输入账号" />
            </div>
            <div class="input-item">
              <label class="label-text">密码:</label>
              <input
                v-model="password"
                type="password"
                class="input-control"
                placeholder="请输入密码"
              />
            </div>
            <div class="button-group">
              <el-button
                v-on:click="loginSubmit('/checkUserPassword')"
                color="#3a0783"
                class="login"
              >
                登录
              </el-button>
              <el-button type="text" @click="switchRegister" class="register-link">
                还没有账号？立即注册
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理员登录">
          <div class="form-container">
            <div class="input-item">
              <label class="label-text">账号:</label>
              <input v-model="id" type="text" class="input-control" placeholder="请输入账号" />
            </div>
            <div class="input-item">
              <label class="label-text">密码:</label>
              <input
                v-model="password"
                type="password"
                class="input-control"
                placeholder="请输入密码"
              />
            </div>
            <el-button
              v-on:click="loginSubmit('/checkManagerPassword')"
              class="login"
              color="#3a0783"
            >
              登录
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      v-model="register"
      :center="true"
      width="500"
      class="custom-dialog"
      :closable="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-tabs type="border-card" class="custom-tabs">
        <el-tab-pane label="用户注册">
          <div class="form-container">
            <div class="input-item">
              <label class="label-text">昵称:</label>
              <input
                v-model="password"
                type="text"
                class="input-control"
                placeholder="请输入昵称"
              />
            </div>
            <div class="input-item">
              <label class="label-text">手机号:</label>
              <input v-model="id" type="text" class="input-control" placeholder="请输入手机号" />
            </div>
            <div class="input-item">
              <label class="label-text">验证码:</label>
              <input
                v-model="password"
                type="password"
                class="input-control"
                placeholder="请输入验证码"
              />
            </div>
            <div class="button-group">
              <el-button v-on:click="registerSubmit" color="#3a0783" class="login">登录</el-button>
              <el-button type="text" @click="switchLogin" class="register-link">
                已有账号？立即登录
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage, ElDialog } from 'element-plus';
import service from '../utils/global.js';
import { goDest } from '../utils/router.js';
const token = ref('');
const centerDialogVisible = ref(true);
const register = ref(false);
const id = ref('');
const password = ref('');
const name = ref('');
const dest = ref('');
function getDestAndJump(url) {
  switch (url) {
    case '/checkUserPassword':
      dest.value = '/BookStorage';
      break;
    case '/checkManagerPassword':
      dest.value = '/Manager/OperateBooks';
      break;
    default:
      ElMessage.error('网站出错，请联系管理员');
  }
  goDest(dest.value);
}

function switchLogin() {
  register.value = false;
  centerDialogVisible.value = true;
}
function switchRegister() {
  centerDialogVisible.value = false;
  register.value = true;
}
function closeAll() {
  centerDialogVisible.value = false;
  register.value = false;
}
function clearInput() {
  id.value = '';
  password.value = '';
  name.value = '';
}
function loginSubmit(url) {
  if (!id.value.trim()) {
    ElMessage.warning('请输入账号');
    return;
  }
  if (!password.value.trim()) {
    ElMessage.warning('请输入密码');
    return;
  }
  const formData = new URLSearchParams();
  formData.append('id', id.value);
  formData.append('password', password.value);
  service
    .post(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    })
    .then((response) => {
      ElMessage.success(response.data);
      password.value = '';
      clearInput();
      closeAll();
      getDestAndJump(url);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        ElMessage.error(error.response.data);
        return;
      }
      ElMessage.error('网站出错，请联系管理员');
    });
}
function registerSubmit() {}
</script>

<style scoped>
@import url('../assets/css/dialog.css');
@import url('../assets/css/top.css');
.login {
  margin-left: 40px;
}
</style>
