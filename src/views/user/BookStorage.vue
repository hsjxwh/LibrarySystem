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
                      <router-link to="/RecommendBooks">借阅排行</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to="/ReaderBorrowRecord">个人借阅记录</router-link>
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
            <el-radio value="悬疑">悬疑</el-radio>
            <el-radio value="恐怖">恐怖</el-radio>
            <el-radio value="哲学">哲学</el-radio>
            <el-radio value="法律">法律</el-radio>
            <el-radio value="文学">文学</el-radio>
            <el-radio value="科学">科学</el-radio>
            <el-radio value="科幻">科幻</el-radio>
            <el-radio value="言情">言情</el-radio>
            <el-radio value="历史">历史</el-radio>
            <el-radio value="医药">医药</el-radio>
            <el-radio value="军事">军事</el-radio>
            <el-radio value="社会课学">社会课学</el-radio>
            <el-radio value="艺术">艺术</el-radio>
            <el-radio value="天文">天文</el-radio>
            <el-radio value="教育">教育</el-radio>
          </el-radio-group>
        </div>
        <div>书籍状态：</div>
        <div>
          <el-radio-group v-model="hasBorrow">
            <el-radio value="全部">全部</el-radio>
            <el-radio value="已借出">已借出</el-radio>
            <el-radio value="未借出">未借出</el-radio>
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
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column prop="name" label="书名" width="200" />
          <el-table-column prop="author" label="作者" width="200" />
          <el-table-column prop="type" label="类型" width="200" />
          <el-table-column prop="time" label="借阅次数" width="200" />
          <el-table-column label="详情(点击查看)" width="200" />
          <el-table-column prop="state" label="状态" width="200" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const searchType = ref('书名');
const options = ['书名', '作者名'];
const searchText = ref('');
const contentType = ref('全部');
const hasBorrow = ref('全部');
const letterStates = ref({});
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
function clickLetter() {
  selectAll.value = false;
}
function search() {
  if (!searchType.value.trim()) {
    ElMessage.warning('请选择搜索类型');
    return;
  }
  if (!searchText.value.trim()) {
    ElMessage.warning('请输入搜索内容');
    return;
  }
  const selectedLetters = [];
  for (const letter in letterStates.value) {
    if (letterStates.value[letter]) selectedLetters.push(letter);
  }
  service.get('', {
    params: {
      type: contentType.value,
      hasBorrow: hasBorrow,
      name: searchType.value === '书名' ? searchText.value : '',
      author: searchType.value === '作者' ? searchText.value : '',
      letter: selectedLetters,
    },
  });
}
</script>

<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
.only-choose {
  fill: 3a0783 !important;
}
.container-wrapper {
  width: 70%;
  border: 1px solid #ddd;
  margin-top: 10px;
  margin-left: 15%;
}
.condition {
  border: 1px solid #ddd;
  margin-left: 1%;
}
.data-box {
  border: 1px solid #ddd;
  width: 95%;
  margin-top: 20px;
  margin-left: 1%;
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
</style>
