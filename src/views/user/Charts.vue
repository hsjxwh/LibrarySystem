<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">书本借阅排行</div>
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
    <el-card style="width: 100%" shadow="never" class="data-card">
      <el-table :data="tableData" style="width: 100%; margin-left: 20px" stripe>
        <el-table-column prop="rank" label="排名" width="300px" />
        <el-table-column prop="name" label="书名" width="500px" />
        <el-table-column prop="time" label="借阅次数" width="300px" />
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import service from '@/utils/global';
import { goDest } from '@/utils/router';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
const tableData = ref([]);
//定时器变量
let refreshTimer = null;
onMounted(() => {
  getCharts();
  //启动定时刷新
  startAutoRefresh();
});
function getCharts() {
  service
    .get('/user/getCharts')
    .then((response) => {
      const dataWithRank = response.data.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      });
      console.log(dataWithRank);
      tableData.value = dataWithRank;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        ElMessage.error(error.response.data);
        goDest('/');
        return;
      }
      siteError();
    });
}
function startAutoRefresh() {
  //如果有定时器，清除旧的
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
  //获得一个新的定时器
  refreshTimer = setInterval(() => {
    getCharts();
  }, 300000);
}
onUnmounted(() => {
  // 组件卸载时清除定时器
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/card.css);
@import url(../../assets/css/addBookForm.css);
::v-deep .el-table__header {
  background-color: #3a0783;
}

::v-deep .el-table__header th {
  background-color: #3a0783;
  color: white;
}

::v-deep .el-table__header tr {
  background-color: #3a0783;
}
</style>
