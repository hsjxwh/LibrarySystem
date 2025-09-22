<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">待采购列表</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
                <el-icon class="el-icon--right"></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/Manager/OperateBooks">增加馆藏</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/Manager/BorrowRecord">借阅服务管理</router-link>
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
  <div class="card-container">
    <el-container>
      <el-main>
        <el-card class="form-card">
          <el-table :data="tableData" style="width: 100%; margin-left: 20px" stripe>
            <el-table-column prop="name" label="书名" width="180px" />
            <el-table-column prop="author" label="作者" width="180px" />
            <el-table-column prop="type" label="类型" width="180px" />
            <el-table-column prop="description" label="描述" width="400px" />
            <el-table-column label="采购" width="250" class="form-item">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="Procurement(scope.row)"
                  class="button1"
                >
                  采购
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="deleteRecord(scope.row)"
                  class="button1"
                >
                  放弃
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-dialog title="采购书籍" v-model="dialogVisible" width="500px" class="custom-dialog">
          <div v-if="currentRow">
            <div class="form-box">
              <span>书名:</span>
              <span>{{ currentRow.name }}</span>
            </div>
            <div class="form-box">
              <span>作者:</span>
              <span>{{ currentRow.author }}</span>
            </div>
            <div class="form-box">
              <span>类型:</span>
              <span>{{ currentRow.type }}</span>
            </div>
            <div class="form-box">
              <span>书名首字母:</span>
              <span>{{ currentRow.head }}</span>
            </div>
            <div class="form-box">
              <span>描述:</span>
              <span>{{ currentRow.description }}</span>
            </div>
            <div class="form-box">
              <span>价格:</span>
              <el-input v-model="price" placeholder="请输入采购次书籍的价钱">{{ price }}</el-input>
            </div>
            <div class="form-box">
              <el-button type="primary" size="small" @click="submit()" class="button1">
                已购买
              </el-button>
              <el-button type="primary" size="small" @click="close()" class="button1">
                取消
              </el-button>
            </div>
          </div>
        </el-dialog>
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
const currentRow = ref(null);
const currentPage = ref(1);
const dialogVisible = ref(false);
const price = ref();
onMounted(() => {
  getData();
});
function getData() {
  service
    .get('/manager/getAllPurchaseBooks')
    .then((response) => {
      const dataWithRank = response.data.map((item, index) => {
        return {
          ...item,
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
//填写必要信息并继续采购
function Procurement(row) {
  currentRow.value = row;
  dialogVisible.value = true;
  description.value = row.description;
}
//删除这条记录
function deleteRecord(row) {
  service
    .delete('/manager/deletePurchaseBook', {
      params: {
        name: row.name,
        author: row.author,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
      getData();
      close();
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//确认购买了书籍
function submit() {
  const formData = new URLSearchParams();
  if (price.value.trim().length <= 0) {
    ElMessage.warning('请输入本书的采购价格');
  }
  formData.append('price', price.value);
  formData.append('name', currentRow.value.name);
  formData.append('author', currentRow.value.author);
  formData.append('head', currentRow.value.head);
  formData.append('description', currentRow.value.description);
  formData.append('type', currentRow.value.type);
  service
    .post('/manager/submitToAddBook', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
      deleteRecord(currentRow.value);
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 409) {
          ElMessage.info(
            `书名是${currentRow.value.name}，作者是${currentRow.value.author}的书籍已经在库中`
          );
          deleteRecord(currentRow.value);
          return;
        }
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function close() {
  dialogVisible.value = false;
  price.value = '';
}
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
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
