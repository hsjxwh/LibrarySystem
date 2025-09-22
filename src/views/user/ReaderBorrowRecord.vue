<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">个人借阅记录</div>
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
        <el-table-column prop="id" label="借阅编号" width="100" class="form-item" />
        <el-table-column prop="userId" label="读者编号" width="100" class="form-item" />
        <el-table-column prop="bookId" label="图书编号" width="100" class="form-item" />
        <el-table-column prop="name" label="书名" width="200" class="form-item" />
        <el-table-column prop="author" label="作者" width="100" class="form-item" />
        <el-table-column prop="time" label="借阅时间" width="200" class="form-item" />
        <el-table-column prop="managerId1" label="借阅管理员id" width="100" class="form-item" />
        <el-table-column
          prop="expectedReturnTime"
          label="预计还书时间"
          width="200"
          class="form-item"
        />
        <el-table-column prop="restitution" label="是否归还" width="50" class="form-item" />
        <el-table-column prop="managerId2" label="还书管理员id" width="100" class="form-item" />
        <el-table-column prop="returnTime" label="还书时间" width="200" class="form-item" />
        <el-table-column prop="deposit" label="扣除押金" width="75" class="form-item" />
        <el-table-column prop="renewTime" label="续借次数" width="75" class="form-item" />
      </el-table>
    </el-card>
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
</template>
<script setup>
import { onMounted } from 'vue';
import service from '@/utils/global';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
import { handleCurrentChange, updateTableData } from '@/utils/paperCut';
const tableData = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const currentRow = ref(null);
onMounted(() => {
  getRecord();
});

function getRecord() {
  currentPage.value = 1;
  service
    .get('/user/getBookRecord')
    .then((response) => {
      const dataWithRank = response.data.map((item, index) => {
        return {
          time: dealWithTime(item.time),
          bookId: item.bookId,
          userId: item.userId,
          expectedReturnTime: dealWithTime(item.expectedReturnTime),
          returnTime: item.returnTime ? dealWithTime(item.returnTime) : '-',
          managerId1: item.managerId1,
          managerId2:
            item.managerId2 !== null && item.managerId2 !== undefined ? item.managerId2 : '-',
          id: item.id,
          restitution: item.restitution === true ? '是' : '否',
          deposit: item.deposit !== null && item.deposit !== undefined ? item.deposit : '-',
          name: item.name,
          author: item.author,
          renewTime: item.renewTime,
        };
      });
      allData.value = dataWithRank;
      total.value = dataWithRank.length;
      updateTableData(allData, tableData, currentPage, pageSize);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function dealWithTime(time) {
  const dateObj = new Date(time);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
}
</script>
<style scoped>
@import url(../../assets/css/card.css);
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
::v-deep .el-aside {
  background-color: #e8e0ed;
  border-right: 1px solid #935aba;
}
:deep(.el-pagination .el-pager li.is-active.number) {
  background-color: #935aba !important;
  color: #ffffff !important;
  border-radius: 4px;
}

:deep(.el-pagination .el-pager li:not(.is-active):hover) {
  color: #9705f8 !important;
  background-color: #f0e6ff !important;
}
</style>
