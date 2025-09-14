<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">个人信息</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
                <el-icon class="el-icon--right"></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/BookStorage">馆藏查询</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/RecommendBooks">个性化图书推荐</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/ReaderBorrowRecord">个人借阅记录</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/BookRules">书馆借阅规则</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/Charts">书本借阅排行</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/RecommendStore">推荐书籍入馆</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/Info">个人信息</router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="card-container">
    <el-container>
      <el-main>
        <el-card style="max-width: 1200px" class="bord-card">
          <el-header class="form-title">个人信息</el-header>
          <div class="normal-p">
            <span>编号:</span>
            <span>{{ id }}</span>
          </div>
          <div class="normal-p">
            <span>名字:</span>
            <span>{{ name }}</span>
          </div>
          <div class="normal-p">
            <span>服务类型:</span>
            <span>{{ serviceMode }}</span>
          </div>
          <div class="normal-p">
            <span>押金余额:</span>
            <span>{{ balance }}</span>
          </div>
          <div class="normal-p">
            <span>目前已借书籍:</span>
            <span>{{ borrow }}</span>
          </div>
          <div class="normal-p">
            <el-button type="primary" size="small" @click="getQR()" class="button1">
              查看详情
            </el-button>
          </div>
        </el-card>
      </el-main>
      <el-dialog
        title="身份验证二维码"
        v-model="dialogVisible"
        width="500px"
        @close="handleDialogClose"
      >
        <div class="qrcode-container">
          <qrcode-vue :value="QR" :size="200" level="H"></qrcode-vue>
          <div>
            <el-button class="button2" @click="getQR">刷新</el-button>
          </div>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import service from '@/utils/global';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
import QrcodeVue from 'qrcode.vue';
//定时器变量
const refreshTimer = ref(null);
onMounted(() => {
  getInfo();
});
onUnmounted(() => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value);
    refreshTimer.value = null;
  }
});
const name = ref('');
const num = ref('');
const borrow = ref(0);
const serviceMode = ref(0);
const id = ref('');
const balance = ref(0.0);
const dialogVisible = ref(false);
const QR = ref('');
function switchMode(mode) {
  let res = '';
  switch (mode) {
    case 0:
      res = '无';
      break;
    case 1:
      res = '能同时借阅20本书';
      break;
    case 2:
      res = '能同时借阅10本书';
      break;
    default:
      ElMessage.error('网站出错，请联系管理员');
      res = '未知类型';
  }
  return res;
}
function getQR() {
  dialogVisible.value = true;
  service
    .get('/generateQrToken')
    .then((response) => {
      QR.value = response.data;
      startAutoRefresh();
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function handleDialogClose() {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value);
    refreshTimer.value = null;
  }
}
function getInfo() {
  service
    .get('/getUseInfo')
    .then((response) => {
      name.value = response.data.name;
      num.value = response.data.num;
      borrow.value = response.data.borrow;
      balance.value = response.data.balance;
      serviceMode.value = switchMode(response.data.hasService);
      id.value = response.data.id;
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function startAutoRefresh() {
  //如果有定时器，清除旧的
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value);
  }
  //获得一个新的定时器,定时三分钟
  refreshTimer.value = setInterval(
    () => {
      getQR();
    },
    1000 * 60 * 3
  );
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/card.css);
@import url(../../assets/css/middleCard.css);
@import url(../../assets/css/buttons.css);
.form-title {
  background-color: #3a0783;
  color: white;
}
.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  padding: 20px;
}
</style>
