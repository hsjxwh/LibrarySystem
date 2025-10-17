<template>
  <el-container style="min-height: 100vh; flex-direction: column">
    <el-header height="60px" style="background-color: #3a0783; padding: 0">
      <div class="top-content">
        <div class="title">借阅服务管理</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
            <el-icon class="el-icon--right"></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/Manager/OperateBooks">管理馆藏</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/BorrowRecord">借阅服务管理</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/OrdersCheck">管理订单记录</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/BookStorage">馆藏查询</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/ProcessRecommendRecord">审核读者荐书</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/WaitToProcurement">待采购列表</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/ForceQuit">管理用户登录情况</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="flex: 1">
      <el-aside width="150px">
        <div>
          <el-button class="button2" @click="activeContent = 'onlineAccounts'">
            查看当前所有在线账号
          </el-button>
        </div>
        <div>
          <el-button class="button2" @click="activeContent = 'blacklist'">黑名单管理</el-button>
        </div>
      </el-aside>
      <el-main>
        <div v-if="activeContent === 'onlineAccounts'" class="form-container">
          <el-table :data="tableData" style="width: 100%; margin-left: 20px" stripe>
            <el-table-column prop="role" label="身份" width="250" class="form-item" />
            <el-table-column prop="id" label="账号" width="250" class="form-item" />
            <el-table-column label="审核" width="250" class="form-item">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="forceQuit(scope.row)"
                  class="button1"
                >
                  强制下线
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next, total"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handleChange"
          />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { ref } from 'vue';
import service from '@/utils/global';
import { siteError } from '@/utils/error';
import { handleCurrentChange, updateTableData } from '@/utils/paperCut';
import { ElMessage } from 'element-plus';
const currentPage = ref(1);
const currentRow = ref(null);
const pageSize = ref(20);
const total = ref(0);
const allData = ref([]);
const activeContent = ref('onlineAccounts');
const tableData = ref([]);
function getAllOnlineAccounts() {
  service
    .get('/manager/getAllOnlineAccounts')
    .then((response) => {
      treat(response);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
}
function treat(response) {
  const dataWithRank = response.data.map((item, index) => {
    return {
      ...item,
    };
  });
  allData.value = dataWithRank;
  total.value = dataWithRank.length;
  updateTableData(allData, tableData, currentPage, pageSize);
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/paper-cut.css);
.form-box {
  margin-top: 10px;
  color: #080709;
}

/* 使用深度选择器来影响对话框头部 */
:deep(.custom-dialog) .el-dialog__header {
  text-align: center;
  background: linear-gradient(45deg, #e0dce2, #3f0963);
  border-radius: 4px 4px 0 0;
  padding: 15px 20px;
}

:deep(.custom-dialog) .el-dialog__title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

:deep(.custom-dialog) .el-dialog__headerbtn {
  top: 15px;
}

:deep(.custom-dialog) .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* 表单样式 */
.form-box {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-box > span:first-child {
  flex: 0 0 100px;
  text-align: left;
  padding-right: 15px;
  color: #000000;
  font-weight: 500;
}

.form-box .el-input,
.form-box .el-textarea {
  flex: 1;
}

.form-box .el-textarea .el-textarea__inner {
  min-height: 80px;
  resize: vertical;
}
</style>
