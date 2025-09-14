<template>
  <div>
    <div calss="top">
      <el-row>
        <el-col :span="24">
          <div class="top-bar" style="height: 60px; background-color: #3a0783">
            <div class="top-content">
              <div class="title">馆藏查询</div>
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
    <div class="custom-style">
      <el-segmented v-model="searchType" :options="options" size="default" />
    </div>
    <div class="container-wrapper">
      <el-card shadow="always" class="search-car">
        <el-form label="搜索">
          <div class="searchType"></div>
          <el-input
            v-model="searchText"
            type="text"
            placeholder="请输入内容"
            class="search-content"
          >
            <template #suffix>
              <el-icon v-on:click="search" class="search-icon">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </el-form>
      </el-card>
    </div>
    <div class="contain-type">
      <el-card style="width: 90%" shadow="never" class="condition">
        <div>类型：</div>
        <div>
          <el-radio-group v-model="contentType" class="only-choose">
            <el-radio value="全部">全部</el-radio>
            <el-radio value="魔幻">魔幻</el-radio>
            <el-radio value="女性">女性</el-radio>
            <el-radio value="民族">民族</el-radio>
            <el-radio value="奇幻">奇幻</el-radio>
            <el-radio value="成长">成长</el-radio>
            <el-radio value="家族">家族</el-radio>
            <el-radio value="乡土">乡土</el-radio>
            <el-radio value="讽刺">讽刺</el-radio>
            <el-radio value="回忆">回忆</el-radio>
            <el-radio value="喜剧">喜剧</el-radio>
            <el-radio value="冒险">冒险</el-radio>
            <el-radio value="复仇">复仇</el-radio>
            <el-radio value="荒诞">荒诞</el-radio>
            <el-radio value="伦理">伦理</el-radio>
            <el-radio value="武侠">武侠</el-radio>
            <el-radio value="悬疑">悬疑</el-radio>
            <el-radio value="温馨">温馨</el-radio>
            <el-radio value="恐怖">恐怖</el-radio>
            <el-radio value="悲剧">悲剧</el-radio>
            <el-radio value="犯罪">犯罪</el-radio>
            <el-radio value="社会">社会</el-radio>
            <el-radio value="儿童">儿童</el-radio>
            <el-radio value="心理">心理</el-radio>
            <el-radio value="哲学">哲学</el-radio>
            <el-radio value="法律">法律</el-radio>
            <el-radio value="文学">文学</el-radio>
            <el-radio value="科幻">科幻</el-radio>
            <el-radio value="战争">战争</el-radio>
            <el-radio value="爱情">爱情</el-radio>
            <el-radio value="历史">历史</el-radio>
            <el-radio value="科普">科普</el-radio>
            <el-radio value="艺术">艺术</el-radio>
            <el-radio value="现实">现实</el-radio>
          </el-radio-group>
        </div>
        <div>书籍状态：</div>
        <div>
          <el-radio-group v-model="hasBorrow">
            <el-radio value="全部">全部</el-radio>
            <el-radio value="已借出">已借出</el-radio>
            <el-radio value="在馆">在馆</el-radio>
          </el-radio-group>
        </div>
        <div>
          首字母：
          <el-checkbox v-model="selectAll" v-on:click="clickAll" label="全部" size="large" />
          <el-checkbox
            v-for="letter in letters"
            :key="letter"
            v-model="letterStates[letter]"
            :label="letter"
            size="large"
            @click="clickLetter"
          />
        </div>
      </el-card>
    </div>
    <div class="data-box">
      <el-card style="width: 100%" shadow="never" class="data-card">
        <el-table :data="tableData" style="width: 100%; margin-left: 20px" stripe>
          <el-table-column prop="name" label="书名" width="250" class="form-item" />
          <el-table-column prop="author" label="作者" width="250" class="form-item" />
          <el-table-column prop="type" label="类型" width="250" class="form-item" />
          <el-table-column prop="time" label="借阅次数" width="250" class="form-item" />
          <el-table-column label="详情(点击查看)" width="250" class="form-item">
            <template #default="scope">
              <el-button type="primary" size="small" @click="openDetail(scope.row)" class="button1">
                查看详情
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="250" />
        </el-table>
      </el-card>
      <el-dialog title="详情" v-model="dialogVisible" width="500px">
        <div v-if="currentRow">
          <div>{{ currentRow.description }}</div>
        </div>
      </el-dialog>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { handleCurrentChange, updateTableData } from '@/utils/paperCut';
const searchType = ref('书名');
const options = ['书名', '作者名'];
const searchText = ref('');
const contentType = ref('全部');
const hasBorrow = ref('全部');
const letterStates = ref({});
const tableData = ref([]);
const dialogVisible = ref(false);
const currentRow = ref(null);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const allData = ref([]);
const letters = ref([
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]);
import service from '@/utils/global';
import { ElMessage } from 'element-plus';
import { reEntry } from '@/utils/re-entry';
onMounted(() => {
  search();
});
letters.value.forEach((letter) => {
  letterStates.value[letter] = false;
});
const selectAll = ref(true);
function clickAll() {
  if (!selectAll.value) {
    Object.keys(letterStates.value).forEach((letter) => {
      letterStates.value[letter] = false;
    });
  }
}
function openDetail(row) {
  currentRow.value = row;
  dialogVisible.value = true;
}
function clickLetter() {
  selectAll.value = false;
}
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
}
function search() {
  currentPage.value = 1;
  const selectedLetters = [];
  for (const letter in letterStates.value) {
    if (letterStates.value[letter]) selectedLetters.push(letter);
  }
  service
    .get('/getAllLibraryStorage', {
      params: {
        type: contentType.value === '全部' ? '' : contentType.value,
        hasBorrow: hasBorrow.value === '全部' ? '' : hasBorrow.value,
        name: searchType.value === '书名' ? searchText.value : '',
        author: searchType.value === '作者名' ? searchText.value : '',
        head: selectedLetters,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      allData.value = response.data;
      total.value = allData.value.length;
      updateTableData(allData, tableData, currentPage, pageSize);
    })
    .catch((error) => {
      reEntry(error);
    });
}
</script>

<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/paper-cut.css);
@import url(../../assets/css/dialog.css);
.only-choose {
  fill: #3a0783 !important;
}
.container-wrapper {
  width: 70%;
  border: 1px solid #ddd;
  margin-top: 10px;
  margin-left: 15%;
}
.condition {
  border: 1px solid #ddd;
  margin-left: 70px;
}
.data-box {
  border: 1px solid #ddd;
  width: 95%;
  margin-top: 20px;
  margin-left: 40px;
  display: flex; /* 新增：使内容居中 */
  justify-content: center; /* 新增：使内容居中 */
}
.search-content {
  width: 100%;
}
.custom-style {
  margin-top: 10px;
  margin-left: 15%;
}
.custom-style .el-segmented {
  --el-segnted-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #d2bff0;
  --el-border-radius-base: 16px;
}
.contain-type {
  margin-top: 20px;
  margin-left: 25px;
}
:deep(.only-choose .el-radio__input.is-checked .el-radio__inner) {
  background-color: #9705f8;
  border-color: #9705f8;
}
:deep(.only-choose .el-radio__input.is-checked + .el-radio__label) {
  background-color: #d2bff0;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

:deep(.el-radio-group:not(.only-choose) .el-radio__input.is-checked .el-radio__inner) {
  background-color: #9705f8;
  border-color: #9705f8;
}
:deep(.el-radio-group:not(.only-choose) .el-radio__input.is-checked + .el-radio__label) {
  background-color: #d2bff0;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #9705f8;
  border-color: #9705f8;
}
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  background-color: #d2bff0;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}
.dialog-content {
  padding: 10px;
}

.dialog-row {
  margin-bottom: 15px;
  padding: 5px 0;
}
</style>
