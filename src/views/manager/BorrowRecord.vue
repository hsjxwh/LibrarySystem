<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">借阅记录</div>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
              <el-icon class="el-icon--right"></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/Manager/BorrowRecord">借阅记录</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script></script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
</style>
