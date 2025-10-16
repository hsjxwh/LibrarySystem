<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title"></div>
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
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="form-container">
    <div class="form-item">
      <span>
        <el-input v-model="id" type="text" placeholder="如有需要，可输入订单编号进行搜索">
          <template #suffix>
            <el-icon v-on:click="searchById" class="search-icon">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </span>
      <span>
        <el-input v-model="userId" type="text" placeholder="如有需要，可输入用户编号进行搜索">
          <template #suffix>
            <el-icon v-on:click="searchByUserId" class="search-icon">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </span>
    </div>
  </div>
  <div class="card-container">
    <el-container>
      <el-main>
        <el-card class="form-card">
          <el-table :data="tableData" style="width: 100%; margin-left: 20px" stripe>
            <el-table-column prop="id" label="订单编号" width="150px" />
            <el-table-column prop="userId" label="读者编号" width="150px" />
            <el-table-column prop="managerId" label="管理员编号" width="150px" />
            <el-table-column prop="money" label="金额" width="100px" />
            <el-table-column prop="time" label="创建时间" width="200px" />
            <el-table-column prop="purpose" label="用途" width="200px" />
            <el-table-column prop="bookId" label="书籍编号" width="200px" />
            <el-table-column prop="name" label="书籍名称" width="200px" />
            <el-table-column prop="author" label="书籍作者" width="200px" />
            <el-table-column prop="back" label="是否退还" width="100px" />
          </el-table>
        </el-card>
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
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import service from '@/utils/global';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
import { updateTableData, handleCurrentChange } from '@/utils/paperCut';
const tableData = ref([]);
const total = ref(0);
const allData = ref([]);
const pageSize = ref(20);
const currentPage = ref(1);
const id = ref('');
const userId = ref('');
onMounted(() => {
  getData();
});
function treat(response) {
  const dataWithRank = response.data.map((item, index) => {
    return {
      ...item,
      time: dealWithTime(item.time),
      back: item.back ? '是' : '否',
    };
  });
  allData.value = dataWithRank;
  total.value = dataWithRank.length;
  updateTableData(allData, tableData, currentPage, pageSize);
}
function getData() {
  service
    .get('/manager/getAllOrders')
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
function searchById() {
  if (id.value.trim().length <= 0) {
    ElMessage.info('请输入订单编号');
    return;
  }
  if (userId.value.trim().length > 0) {
    ElMessage.info('两者只能按照其中一个搜索，当前为按订单编号搜索');
  }
  service
    .get('/manager/getSpecialOrder', {
      params: {
        id: id.value,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      treat(response);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
    });
}
function searchByUserId() {
  if (userId.value.trim().length <= 0) {
    ElMessage.info('请输入用户编号');
    return;
  }
  if (id.value.trim().length > 0) {
    ElMessage.info('两者只能按照其中一个搜索，当前为按用户编号搜索');
  }
  service
    .get('/manager/getSomeoneOrders', {
      params: {
        userId: userId.value,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      treat(response);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
    });
}
//解析时间
function dealWithTime(time) {
  const dateObj = new Date(time);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/paper-cut.css);
@import url(../../assets/css/addBookForm.css);
</style>
