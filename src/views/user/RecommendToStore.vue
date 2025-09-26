<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">推荐书籍入馆</div>
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
                    <router-link to="/ReaderOrders">个人订单记录</router-link>
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
        <el-card class="form-card">
          <template #header>
            <div class="card-header">
              <h2>推荐书籍信息</h2>
            </div>
          </template>
          <div class="form-container">
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
              <span class="label">描述:</span>
              <el-input
                v-model="description"
                placeholder="请输入图书的描述"
                type="textarea"
                .rows="4"
                show-word-limit
                class="form-input"
              />
            </div>
            <div>
              <el-button class="button2" @click="submitRecommendBook">提交</el-button>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import service from '@/utils/global';
import { ElMessage, emitChangeFn } from 'element-plus';
import { siteError } from '@/utils/error';
const name = ref('');
const type = ref('');
const author = ref('');
const description = ref('');
function close() {
  name.value = '';
  author.value = '';
  type.value = '';
  description.value = '';
}
function submitRecommendBook() {
  if (name.value.trim().length <= 0) {
    ElMessage.info('请输入书名');
    return;
  }
  if (author.value.trim().length <= 0) {
    ElMessage.info('请输入作者名');
    return;
  }
  if (type.value.trim().length <= 0) {
    ElMessage.info('请选择类型');
    return;
  }
  if (description.value.trim().length < 0) {
    emitChangeFn.info('请输入书本的描述');
    return;
  }
  const formData = new URLSearchParams();
  formData.append('name', name.value);
  formData.append('author', name.value);
  formData.append('type', type.value);
  formData.append('description', description.value);
  service
    .post('/user/postRecommendToStore', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
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
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.form-item {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
}
.form-item .label {
  width: 120px;
  text-align: left;
  padding-right: 15px;
  flex-shrink: 0;
  font-weight: bold;
  color: #59535d;
}
.form-item .form-input {
  flex: 1;
}
.form-item .el-textarea {
  vertical-align: middle;
}
.form-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-header {
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #ebeef5;
}

.card-header h2 {
  color: #3a0783;
  margin: 0;
  font-size: 1.5rem;
}

.form-card .form-container {
  padding: 20px;
  min-height: auto;
}

.card-container .el-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); /* 保持垂直居中 */
}
</style>
