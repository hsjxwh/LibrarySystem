<template>
  <el-container style="min-height: 100vh; flex-direction: column">
    <el-header height="60px" style="background-color: #3a0783; padding: 0">
      <div class="top-content">
        <div class="title">管理馆藏</div>
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
          <el-button class="button2" @click="activeContent = 'books'">按本书添加</el-button>
        </div>
        <div>
          <el-button class="button2" @click="activeContent = 'file'">按文件添加</el-button>
        </div>
        <div>
          <el-button class="button2" @click="activeContent = 'delete'">删除馆藏</el-button>
        </div>
      </el-aside>
      <el-main>
        <div v-if="activeContent === 'books'" class="form-container">
          <div class="form-item">
            <span class="label">书名:</span>
            <el-input class="form-input" v-model="name" placeholder="请输入图书的名字" />
          </div>
          <div class="form-item">
            <span class="label">作者名:</span>
            <el-input class="form-input" v-model="author" placeholder="请输入图书的作者名字" />
          </div>
          <div class="form-item">
            <span class="label">类型:</span>
            <el-select class="form-input" v-model="type" placeholder="请选择图书的类型">
              <el-option label="魔幻" value="魔幻" />
              <el-option label="女性" value="女性">女性</el-option>
              <el-option label="家族" value="家族">家族</el-option>
              <el-option label="民族" value="民族">民族</el-option>
              <el-option label="奇幻" value="奇幻">奇幻</el-option>
              <el-option label="成长" value="成长">成长</el-option>
              <el-option label="家族" value="家族">家族</el-option>
              <el-option label="乡土" value="乡土">乡土</el-option>
              <el-option label="讽刺" value="讽刺">讽刺</el-option>
              <el-option label="回忆" value="回忆">回忆</el-option>
              <el-option label="喜剧" value="喜剧">喜剧</el-option>
              <el-option label="冒险" value="冒险">冒险</el-option>
              <el-option label="复仇" value="复仇">复仇</el-option>
              <el-option label="荒诞" value="荒诞">荒诞</el-option>
              <el-option label="伦理" value="伦理">伦理</el-option>
              <el-option label="武侠" value="武侠">武侠</el-option>
              <el-option label="悬疑" value="悬疑">悬疑</el-option>
              <el-option label="温馨" value="温馨">温馨</el-option>
              <el-option label="恐怖" value="恐怖">恐怖</el-option>
              <el-option label="悲剧" value="悲剧">悲剧</el-option>
              <el-option label="犯罪" value="犯罪">犯罪</el-option>
              <el-option label="社会" value="社会">社会</el-option>
              <el-option label="儿童" value="儿童">儿童</el-option>
              <el-option label="心理" value="心理">心理</el-option>
              <el-option label="哲学" value="哲学">哲学</el-option>
              <el-option label="法律" value="法律">法律</el-option>
              <el-option label="文学" value="文学">文学</el-option>
              <el-option label="科幻" value="科幻">科幻</el-option>
              <el-option label="战争" value="战争">战争</el-option>
              <el-option label="爱情" value="爱情">爱情</el-option>
              <el-option label="历史" value="历史">历史</el-option>
              <el-option label="科普" value="科普">科普</el-option>
              <el-option label="艺术" value="艺术">艺术</el-option>
              <el-option label="显示" value="现实">现实</el-option>
            </el-select>
          </div>
          <div class="form-item">
            <span class="label">书名首字母:</span>
            <el-input class="form-input" v-model="head" placeholder="请输入图书的书名首字母" />
          </div>
          <div class="form-item">
            <span class="label">价格:</span>
            <el-input class="form-input" v-model="price" placeholder="请输入图书的价格" />
          </div>
          <div class="form-item">
            <span class="label">描述:</span>
            <el-input
              v-model="description"
              placeholder="请输入图书的描述"
              type="textarea"
              .rows="8"
              show-word-limit
              class="form-input"
            />
          </div>
          <div>
            <el-button class="button2" @click="submitBook">提交</el-button>
          </div>
        </div>
        <div v-if="activeContent === 'file'" class="form-container">
          <div class="nomal-div">注意:</div>
          <div class="nomal-div">(1)只能上传excel表格(.xls或xlsx后缀)</div>
          <div class="nomal-div">(2)类型只能填写书馆有的</div>
          <div class="nomal-div">
            <span class="label">模板文件:</span>
            <el-button @click="downloadTemplate" class="button4">点击下载</el-button>
          </div>
          <div class="nomal-div">
            <span class="label">文件:</span>
            <input class="form-input" type="file" ref="fileBag" multiple="false" />
          </div>
          <div class="nomal-div">
            <el-button class="button3" @click="submitFile">提交</el-button>
          </div>
        </div>
        <div v-if="activeContent === 'delete'" class="form-container">
          <div class="form-item">
            <span class="label">书名:</span>
            <el-input class="form-input" v-model="name" placeholder="请输入图书的名字" />
          </div>
          <div class="form-item">
            <span class="label">作者名:</span>
            <el-input class="form-input" v-model="author" placeholder="请输入图书的作者名字" />
          </div>
          <div class="nomal-div">
            <el-button class="button3" @click="submitDelete">提交</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';
const activeContent = ref('books');
const name = ref('');
const author = ref('');
const description = ref('');
const type = ref('');
const price = ref();
const head = ref('');
const fileBag = ref(null);
import service from '@/utils/global';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
const refreshTimer = ref(null);
onUnmounted(() => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value);
    refreshTimer.value = null;
  }
});
//将书籍加入到数据库
function submitBook() {
  if (!name.value.trim()) {
    ElMessage.warning('请输入书籍的名字');
    return;
  }
  if (!author.value.trim()) {
    ElMessage.warning('请输入书籍的作者');
    return;
  }
  if (!type.value.trim()) {
    ElMessage.warning('请选择书籍的类型');
    return;
  }
  if (!price.value.trim()) {
    ElMessage.warning('请输入书籍的价格');
    return;
  }
  if (!head.value.trim()) {
    ElMessage.warning('请输入书籍的名字首字母');
    return;
  }
  if (!description.value.trim()) {
    description.value = '无';
  }
  const formData = new URLSearchParams();
  formData.append('name', name.value);
  formData.append('author', author.value);
  formData.append('type', type.value);
  formData.append('price', price.value);
  formData.append('head', head.value);
  formData.append('description', description.value);
  service
    .post('/manager/submitToAddBook', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      ElMessage.success(response.data);
      name.value = '';
      author.value = '';
      type.value = '';
      price.value = null;
      head.value = '';
      description.value = '';
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//讲文件中的书籍加入数据库
function submitFile() {
  const bag = fileBag.value;
  const file = bag.files[0];
  if (!file) {
    ElMessage.warning('请选择文件');
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  service
    .post('/manager/submitMaterialsToAddBooks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      const successCount = response.data.successCount;
      const failCount = response.data.failCount;
      const totalCount = response.data.totalCount;
      const sectences = response.data.sectences || [];
      let message = `导入成功,一共${totalCount}条数据,成功${successCount}条，
          失败${failCount}条。`;
      if (sectences.length > 0) {
        message += `\n详情:\n` + sectences.join('\n');
      }
      ElMessage.info(message);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//下载模板文件
function downloadTemplate() {
  service
    .get('/manager/downloadTemplateFile', {
      responseType: 'blob',
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '图书馆导入书籍模板文件.xlsx';
      document.body.appendChild(a);
      a.click();
      //释放临时资源
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function submitDelete() {
  if (!name.value.trim()) {
    ElMessage.warning('请输入书籍的名字');
    return;
  }
  if (!author.value.trim()) {
    ElMessage.warning('请输入书籍的作者');
    return;
  }
  service
    .delete('/manager/deleteBook', {
      params: {
        name: name.value,
        author: author.value,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
      name.value = '';
      author.value = '';
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/addBooKForm.css);
::v-deep .el-aside {
  background-color: #e8e0ed;
  border-right: 1px solid #935aba;
}
</style>
